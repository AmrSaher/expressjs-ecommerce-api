import { validationResult, matchedData } from "express-validator";
import { Product } from "../Models/Product.mjs";

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).send(products);
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
