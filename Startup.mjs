import express from "express";
import cookieParser from "cookie-parser";
import routes from "./Routes/index.mjs";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

export const CreateApp = () => {
    const app = express();

    // Middlewares
    app.use("/uploads", express.static("uploads"));
    app.use(express.json());
    app.use(cookieParser(process.env.SECRET || "secret"));
    app.use(
        session({
            secret: "hello amr saher",
            saveUninitialized: false,
            resave: false,
            cookie: {
                maxAge: 1000 * 60 * 60, // 1 hour
            },
            store: MongoStore.create({
                client: mongoose.connection.getClient(),
            }),
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(routes);

    return app;
};
