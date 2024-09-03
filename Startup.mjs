import express from "express";
import cookieParser from "cookie-parser";
import routes from "./Routes/index.mjs";

export const CreateApp = () => {
    const app = express();

    // Middlewares
    app.use(express.json());
    app.use(cookieParser(process.env.SECRET || "secret"));
    app.use(routes);

    return app;
};
