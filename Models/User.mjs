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
    },
    { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
