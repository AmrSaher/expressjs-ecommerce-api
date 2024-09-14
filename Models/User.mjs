import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: mongoose.Schema.Types.String,
            required: true,
            unique: true,
        },
        email: {
            type: mongoose.Schema.Types.String,
            required: true,
            unique: true,
        },
        password: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        isAdmin: {
            type: mongoose.Schema.Types.Boolean,
            default: false,
        },
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
            required: true,
            unique: true,
        },
        cards: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Card",
            },
        ],
        addresses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Address",
            },
        ],
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
            required: true,
            unique: true,
        },
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
            },
        ],
    },
    { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
