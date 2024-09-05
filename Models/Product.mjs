import mongoose from "mongoose";

const arrayLimit = (val) => val.length <= 5;

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: mongoose.Schema.Types.String,
            required: true,
            trim: true,
        },
        description: {
            type: mongoose.Schema.Types.String,
            required: true,
            trim: true,
        },
        price: {
            type: mongoose.Schema.Types.Number,
            required: true,
            min: 0,
        },
        categories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        }],
        brand: {
            type: mongoose.Schema.Types.String,
            trim: true,
        },
        stock: {
            type: mongoose.Schema.Types.Number,
            required: true,
            min: 0,
            default: 0,
        },
        images: {
            type: [mongoose.Schema.Types.String],
            validate: [arrayLimit, "{PATH} exceeds the limit of 5"],
        },
        ratings: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                rating: {
                    type: mongoose.Schema.Types.Number,
                    required: true,
                    min: 1,
                    max: 5,
                },
                review: {
                    type: mongoose.Schema.Types.String,
                    trim: true,
                },
            },
        ],
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
