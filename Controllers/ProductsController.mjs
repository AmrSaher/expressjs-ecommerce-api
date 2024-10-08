import { validationResult, matchedData } from "express-validator";
import { Product } from "../Models/Product.mjs";
import { Category } from "../Models/Category.mjs";
import upload from "../Middlewares/UploadMiddleware.mjs";
import multer from "multer";

export const getProducts = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json(validationErrors);

    const data = matchedData(req);
    const sort = {};
    const filter = {};

    data.sortBy?.split(",").forEach((key) => {
        key = key.trim();
        const keyName = key.includes("-desc") ? key.split("-")[0] : key;
        sort[keyName] = key.includes("-desc") ? -1 : 1;
    });

    const categories = data.categories
        ?.split(",")
        .map((category) => category.trim());
    if (categories) filter["categories"] = { $in: categories };

    const rating = data.rating?.split(",").map((rating) => parseInt(rating));

    try {
        const products = (await Product.find(filter).sort(sort)).filter(
            (product) => {
                if (!rating) return true;
                let totalRating = 0;
                for (const rating of product.ratings) {
                    totalRating += rating.rating;
                }
                const avgRating = Math.floor(
                    totalRating / product.ratings.length
                );
                if (rating.includes(avgRating)) return true;
                return false;
            }
        );
        res.status(200).json(products);
    } catch (err) {
        res.sendStatus(400);
    }
};

export const getProduct = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json(validationErrors);

    const data = matchedData(req);

    try {
        const product = await Product.findById(data.id);
        res.status(200).json(product);
    } catch (err) {
        res.sendStatus(400);
    }
};

// const validationErrors = validationResult(req);
// if (!validationErrors.isEmpty())
//     return res.status(400).json(validationErrors);

// const data = matchedData(req);
// const newProduct = new Product(data);

export const createProduct = (req, res) =>
    upload.array("images", 5)(req, res, async (err) => {
        if (req.files.length < 1) {
            return res
                .status(400)
                .json({ msg: "At least 1 file is required." });
        }

        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_UNEXPECTED_FILE") {
                return res
                    .status(400)
                    .json({ msg: "Maximum 5 files allowed." });
            }
            return res.status(400).json({ msg: err.message });
        } else if (err) {
            return res.status(500).json({ msg: "File upload failed." });
        }

        const {
            body: { name, description, stock, brand, price, categories },
        } = req;
        const data = {
            name,
            description,
            stock: parseInt(stock),
            brand: brand || undefined,
            categories: categories || undefined,
            price: parseInt(price),
            images: req.files.map((file) => file.filename),
        };
        const newProduct = new Product(data);

        try {
            for (const categoryId of categories) {
                const category = await Category.findById(categoryId);
                category.products.push(newProduct._id);
                await category.save();
            }
        } catch (err) {
            return res.sendStatus(400);
        }

        try {
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        } catch (err) {
            res.sendStatus(400);
        }
    });

export const deleteProduct = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json(validationErrors);

    const data = matchedData(req);

    try {
        await Product.deleteOne({ _id: data.id });
        res.status(200).json({ msg: "Product deleted successfully." });
    } catch (err) {
        res.sendStatus(400);
    }
};

export const updateProduct = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json(validationErrors);

    const data = matchedData(req);

    try {
        await Product.findByIdAndUpdate(data.id, {
            ...data,
            id: undefined,
        });
        res.status(200).json({ msg: "Product updated successfully." });
    } catch (err) {
        res.sendStatus(400);
    }
};

export const rateProduct = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json(validationErrors);

    const data = matchedData(req);
    const rating = {
        user: req.user._id,
        rating: data.rating,
        review: data.review || undefined,
    };

    try {
        const product = await Product.findById(data.id);
        product.ratings.push(rating);
        await product.save();

        res.status(200).json(rating);
    } catch (err) {
        res.sendStatus(400);
    }
};
