import app from "./app/app.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: `${__dirname}/../config.env` });
const PORT = process.env.PORT || 3000;

const DB = process.env.DATABASE
  ? process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD || "")
  : "";

if (DB) {
  mongoose
    .connect(DB)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
} else {
  console.error("MongoDB connection string is not defined.");
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
