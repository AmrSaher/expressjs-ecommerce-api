import { validationResult, matchedData } from "express-validator";
import { hashPassword, comparePassword } from "../Helpers/Bcrypt.mjs";
import { generateJWTToken } from "../Helpers/JWT.mjs";
import { User } from "../Models/User.mjs";
import { Profile } from "../Models/Profile.mjs";
import { Cart } from "../Models/Cart.mjs";

export const register = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json(validationErrors);

    const data = matchedData(req);

    if (data.password !== data.password_confirmation)
        return res.status(400).json({
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
    const newCart = new Cart({
        user: newUser._id,
    });
    newUser.profile = newProfile._id;
    newUser.cart = newCart._id;

    try {
        const savedUser = await newUser.save();
        const token = generateJWTToken(savedUser);
        await newProfile.save();
        await newCart.save();
        res.status(201).json({ token });
    } catch (err) {
        console.log(err);
        res.status(409).json({
            msg: "Name or email already exists. Please choose a different one.",
        });
    }
};

export const login = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json(validationErrors);

    const data = matchedData(req);
    const user = await User.findOne({ email: data.email });

    if (!user || !comparePassword(data.password, user.password))
        return res.status(400).json({ msg: "Invalid Credentials." });

    const token = generateJWTToken(user);
    res.status(200).json({ token });
};

export const getUser = async (req, res) => {
    res.status(200).json(req.user);
};

export const makeUserAdmin = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
        return res.status(400).json(validationErrors);

    const data = matchedData(req);
    let user;

    try {
        user = await User.findById(data.id);
    } catch (err) {
        return res.status(404).json({ msg: "User not found." });
    }

    user.isAdmin = true;

    try {
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.sendStatus(400);
    }
};
