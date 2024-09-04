import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        firstName: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        lastName: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        streetAddress: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        city: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        state: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        postalCode: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        country: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        phoneNumber: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        addressType: {
            type: mongoose.Schema.Types.String,
            enum: ["Home", "Work", "Other"],
            default: "Home",
        },
        isDefault: {
            type: mongoose.Schema.Types.Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Address = mongoose.model("Address", AddressSchema);
