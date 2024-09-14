import { Order } from "../Models/Order.mjs";

export const getOrders = async (req, res) => {
    const orders = await Order.find({ _id: { $in: req.user.orders } });
    res.status(200).send(orders);
};

export const getAllOrders = async (req, res) => {
    const orders = await Order.find();
    res.status(200).send(orders);
};
