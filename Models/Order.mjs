import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            required: true,
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
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
        status: {
            type: mongoose.Schema.Types.String,
            enum: [
                "Pending",
                "Processing",
                "Shipped",
                "Delivered",
                "Canceled",
                "Refunded",
            ],
            default: "Pending",
        },
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
