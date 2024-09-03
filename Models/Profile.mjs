import mongoose, { mongo } from "mongoose";

const ProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        firstName: {
            type: mongoose.Schema.Types.String,
        },
        lastName: {
            type: mongoose.Schema.Types.String,
        },
        firstName: {
            type: mongoose.Schema.Types.String,
        },
        birthDate: {
            type: mongoose.Schema.Types.Date,
        },
        image: {
            type: mongoose.Schema.Types.String,
        },
    },
    { timestamps: true }
);

export const Profile = mongoose.model("Profile", ProfileSchema);
