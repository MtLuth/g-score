import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app/app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: `${__dirname}/../config.env` });
const PORT = process.env.PORT || 3000;

const DB = process.env.DATABASE;

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
