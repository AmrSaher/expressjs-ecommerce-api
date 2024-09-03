import mongoose from "mongoose";

const DB_NAME = process.env.DB_NAME || "expressjs_ecommerce_api";

mongoose
    .connect(`mongodb://localhost/${DB_NAME}`)
    .then((res) => console.log("Connected to database successfully."))
    .catch((err) => console.log("Database connection error : " + err));
