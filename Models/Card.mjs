import mongoose from "mongoose";

const CardSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        cardName: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        cardNumber: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        expiryDate: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Card = mongoose.model("Card", CardSchema);
