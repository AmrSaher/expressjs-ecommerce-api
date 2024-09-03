import { matchedData, validationResult } from "express-validator";
import { Profile } from "../Models/Profile.mjs";

export const updateProfile = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).send(validationErrors);

    const data = matchedData(req);
    const profile = await Profile.findById(req.user.profile);

    profile.firstName = data.firstName;
    profile.lastName = data.lastName;
    profile.birthDate = data.birthDate;

    try {
        const savedProfile = await profile.save();
        res.status(200).send(savedProfile);
    } catch (err) {
        res.sendStatus(400);
    }
};

export const getProfile = async (req, res) => {
    const profile = await Profile.findById(req.user.profile);
    res.status(200).send(profile);
};
