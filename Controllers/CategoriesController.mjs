import { matchedData, validationResult } from "express-validator";
import { Category } from "../Models/Category.mjs";

export const createCategory = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).send(validationErrors);

    const data = matchedData(req);
    const newCategory = new Category(data);

    try {
        const savedCategory = await newCategory.save();
        res.status(200).send(savedCategory);
    } catch (err) {
        res.sendStatus(err);
    }
};
