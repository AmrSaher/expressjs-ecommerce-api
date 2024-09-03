import { CreateApp } from "./Startup.mjs";
import dotenv from "dotenv";
import "./Config/db.mjs";
import "./Config/Strategies/jwt-strategy.mjs";

dotenv.config();
const app = CreateApp();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Go to http://localhost:${PORT}`);
});
