import { matchedData, validationResult } from "express-validator";
import { Address } from "../Models/Address.mjs";

export const getAddresses = async (req, res) => {
    const addresses = await Address.find({ user: req.user._id });
    return res.status(200).send(addresses);
};

export const createAddress = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).send(validationErrors);

    const data = matchedData(req);

    // Make "isDefault" in every user address equals false
    if (data.isDefault) {
        const addresses = await Address.find({ user: req.user._id });
        addresses.forEach(async (address) => {
            if (!address.isDefault) return;
            address.isDefault = false;
            await address.save();
        });
    }

    const newAddress = new Address({
        ...data,
        user: req.user._id,
    });

    try {
        const savedAddress = await newAddress.save();
        res.status(200).send(savedAddress);
    } catch (err) {
        res.sendStatus(400);
    }
};

export const updateAddress = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).send(validationErrors);

    const data = matchedData(req);

    // Make "isDefault" in every user address equals false
    if (data.isDefault) {
        const addresses = await Address.find({ user: req.user._id });
        addresses.forEach(async (address) => {
            address.isDefault = false;
            await address.save();
        });
    }

    let address;
    try {
        address = await Address.findById(data.id);
        if (
            address.user.toString() != req.user._id.toString() &&
            !req.user.isAdmin
        )
            throw new Error("This address is not for this user.");
    } catch (err) {
        return res.status(404).send({ msg: "Address not found." });
    }

    try {
        await address.updateOne(data);
        res.status(200).send({ msg: "Address updated successfully." });
    } catch (err) {
        res.sendStatus(400);
    }
};

export const deleteAddress = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).send(validationErrors);

    const data = matchedData(req);
    let address;

    try {
        address = await Address.findById(data.id);
        if (
            address.user.toString() != req.user._id.toString() &&
            !req.user.isAdmin
        )
            throw new Error("This address is not for this user.");
    } catch (err) {
        return res.status(404).send({ msg: "Address not found." });
    }

    try {
        await address.deleteOne();
        res.status(200).send({ msg: "Address deleted successfully." });
    } catch (err) {
        res.sendStatus(400);
    }
};
