import { matchedData, validationResult } from "express-validator";
import { Cart } from "../Models/Cart.mjs";

export const getCart = async (req, res) => {
    const cart = await Cart.findById(req.user.cart);
    res.status(200).json(cart);
};

export const addProduct = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json(validationErrors);

    const data = matchedData(req);
    let isExist = false;

    try {
        const cart = await Cart.findById(req.user.cart);
        cart.products.map((product) => {
            if (product.product.toString() != data.product) return product;
            isExist = true;
            product.quantity += data.quantity;
            return product;
        });
        if (!isExist) {
            cart.products.push(data);
        }
        await cart.save();
        res.status(200).json({ msg: "Product added successfully." });
    } catch (err) {
        res.sendStatus(400);
    }
};

export const deleteProduct = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json(validationErrors);

    const data = matchedData(req);

    try {
        const cart = await Cart.findById(req.user.cart);
        cart.products = cart.products.filter(
            (product) => product.product.toString() != data.id
        );
        await cart.save();
        res.status(200).json({ msg: "Product deleted successfully." });
    } catch (err) {
        res.sendStatus(400);
    }
};

export const updateQuantity = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json(validationErrors);

    const data = matchedData(req);

    try {
        const cart = await Cart.findById(req.user.cart);
        cart.products.map((product) => {
            if (product.product.toString() == data.id)
                product.quantity = data.quantity;
            return product;
        });
        await cart.save();
        res.status(200).json({ msg: "Product updated successfully." });
    } catch (err) {
        res.sendStatus(400);
    }
};
