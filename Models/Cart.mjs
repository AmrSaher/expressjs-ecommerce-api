import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true,
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                },
                quantity: {
                    type: mongoose.Schema.Types.Number,
                    min: 1,
                    default: 1,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

export const Cart = mongoose.model("Cart", CartSchema);
