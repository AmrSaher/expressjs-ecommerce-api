import { validationResult, matchedData } from "express-validator";
import { hashPassword, comparePassword } from "../Helpers/Bcrypt.mjs";
import { generateJWTToken } from "../Helpers/JWT.mjs";
import { User } from "../Models/User.mjs";
import { Profile } from "../Models/Profile.mjs";

export const register = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).send(validationErrors);

    const data = matchedData(req);

    if (data.password !== data.password_confirmation)
        return res.status(400).send({
            errors: [
                {
                    type: "field",
                    value: data.password_confirmation,
                    msg: "Password and confirmation do not match.",
                    path: "password_confirmation",
                    location: "body",
                },
            ],
        });

    data.password = hashPassword(data.password);
    const newUser = new User({
        username: data.username,
        email: data.email,
        password: data.password,
    });
    const newProfile = new Profile({
        user: newUser._id,
    });
    newUser.profile = newProfile._id;

    try {
        const savedUser = await newUser.save();
        const token = generateJWTToken(savedUser);
        await newProfile.save();
        res.status(201).send({ token });
    } catch (err) {
        console.log(err);
        res.status(409).send({
            msg: "Name or email already exists. Please choose a different one.",
        });
    }
};

export const login = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).send(validationErrors);

    const data = matchedData(req);
    const user = await User.findOne({ email: data.email });

    if (!user || !comparePassword(data.password, user.password))
        return res.status(400).send({ msg: "Invalid Credentials." });

    const token = generateJWTToken(user);
    res.status(200).send({ token });
};

export const getUser = async (req, res) => {
    res.status(200).send(req.user);
};

export const makeUserAdmin = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).send(validationErrors);

    const data = matchedData(req);
    let user;

    try {
        user = await User.findById(data.id);
    } catch (err) {
        return res.status(404).send({ msg: "User not found." });
    }

    user.isAdmin = true;

    try {
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    } catch (err) {
        res.sendStatus(400);
    }
};
