import { matchedData, validationResult } from "express-validator";
import { Category } from "../Models/Category.mjs";

export const getCategories = async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
};

export const createCategory = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json(validationErrors);

    const data = matchedData(req);
    const newCategory = new Category(data);

    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (err) {
        res.sendStatus(err);
    }
};

export const deleteCategory = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json(validationErrors);

    const data = matchedData(req);

    try {
        await Category.findByIdAndDelete(data.id);
        res.status(200).json({ msg: "Category deleted successfully." });
    } catch (err) {
        res.sendStatus(400);
    }
};

export const updateCategory = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json(validationErrors);

    const data = matchedData(req);

    try {
        await Category.findByIdAndUpdate(data.id, {
            ...data,
            id: undefined,
        });
        res.status(200).json({ msg: "Category updated successfully." });
    } catch (err) {
        res.sendStatus(400);
    }
};
