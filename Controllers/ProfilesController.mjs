import { matchedData, validationResult } from "express-validator";
import { Profile } from "../Models/Profile.mjs";

export const updateProfile = async (req, res) => {
    // const validationErrors = validationResult(req);
    // if (!validationErrors.isEmpty())
    //     return res.status(400).json(validationErrors);

    const {
        body: { firstName, lastName, phoneNumber, birthDate },
    } = req;
    const data = {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phoneNumber: phoneNumber || undefined,
        birthDate: birthDate || undefined,
        image: req.file ? req.file.filename : undefined,
    };

    try {
        await Profile.findByIdAndUpdate(req.user.profile, data);
        res.status(200).json({ msg: "Your profile updated successfully." });
    } catch (err) {
        res.sendStatus(400);
    }
};

export const getProfile = async (req, res) => {
    const profile = await Profile.findById(req.user.profile);
    res.status(200).json(profile);
};
