import { matchedData, validationResult } from "express-validator";
import { Card } from "../Models/Card.mjs";

export const getCards = async (req, res) => {
    const cards = await Card.find({ user: req.user._id });
    res.status(200).json(cards);
};

export const createCard = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json(validationErrors);

    const data = matchedData(req);
    const newCard = new Card({
        ...data,
        user: req.user._id,
    });

    try {
        const savedCard = await newCard.save();
        res.status(200).json(savedCard);
    } catch (err) {
        res.sendStatus(400);
    }
};

export const updateCard = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json(validationErrors);

    const data = matchedData(req);
    let card;

    try {
        card = await Card.findById(data.id);
        if (
            card.user.toString() != req.user._id.toString() &&
            !req.user.isAdmin
        )
            throw new Error("This card is not for this user.");
    } catch (err) {
        return res.status(404).json({ msg: "Card not found." });
    }

    card.cardName = data.cardName;
    card.cardNumber = data.cardNumber;
    card.expiryDate = data.expiryDate;

    try {
        await card.save();
        res.status(200).json({ msg: "Card updated successfully." });
    } catch (err) {
        res.sendStatus(400);
    }
};

export const deleteCard = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json(validationErrors);

    const data = matchedData(req);
    let card;

    try {
        card = await Card.findById(data.id);
        if (
            card.user.toString() != req.user._id.toString() &&
            !req.user.isAdmin
        )
            throw new Error("This card is not for this user.");
    } catch (err) {
        return res.status(404).json({ msg: "Card not found." });
    }

    try {
        await Card.deleteOne({ _id: card._id });
        res.status(200).json({ msg: "Card deleted successfully." });
    } catch (err) {
        res.sendStatus(400);
    }
};
