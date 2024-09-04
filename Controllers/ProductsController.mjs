import { validationResult, matchedData } from "express-validator";
import { Product } from "../Models/Product.mjs";

export const getProducts = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).send(validationErrors);

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
    if (categories) filter.categories = { $all: categories };

    const rating = data.rating?.split(",").map((rating) => parseInt(rating));

    try {
        const products = (await Product.find(filter).sort(sort)).filter(
            (product) => {
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
        res.status(200).send(products);
    } catch (err) {
        res.sendStatus(400);
    }
};

export const getProduct = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).send(validationErrors);

    const data = matchedData(req);

    try {
        const product = await Product.findById(data.id);
        res.status(200).send(product);
    } catch (err) {
        res.sendStatus(400);
    }
};

export const createProduct = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).send(validationErrors);

    const data = matchedData(req);
    const newProduct = new Product(data);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).send(savedProduct);
    } catch (err) {
        res.sendStatus(400);
    }
};

export const deleteProduct = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).send(validationErrors);

    const data = matchedData(req);

    try {
        await Product.deleteOne({ _id: data.id });
        res.status(200).send({ msg: "Product deleted successfully." });
    } catch (err) {
        res.sendStatus(400);
    }
};

export const updateProduct = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).send(validationErrors);

    const data = matchedData(req);

    try {
        await Product.findByIdAndUpdate(data.id, {
            ...data,
            id: undefined,
        });
        res.status(200).send({ msg: "Product updated successfully." });
    } catch (err) {
        res.sendStatus(400);
    }
};
