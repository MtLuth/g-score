import csvParser from "csv-parser";
import dotenv from "dotenv";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import Result from "~/models/result.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: `${__dirname}/../../config.env` });
const DB = process.env.DATABASE;
const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const stream = fs.createReadStream(filePath);
        console.log("Parsing data ....");
        stream
            .pipe(csvParser())
            .on("data", (data) => {
            results.push(data);
        })
            .on("end", () => {
            console.log(`Successfully: ${results.length} items`);
            resolve(results);
        })
            .on("error", (error) => reject(error));
    });
};
const seedDatabase = async () => {
    try {
        await mongoose.connect(DB);
        console.log("MongoDB connected");
        await Result.deleteMany({});
        const fileCSV = `${__dirname}/data.csv`;
        const seedData = await parseCSV(fileCSV);
        for (const item of seedData) {
            console.log("-------------");
            try {
                const result = await Result.create(item);
                console.log(`Insert SBD: ${item.sbd} successfully`);
            }
            catch (error) {
                console.error("Error inserting item:", error);
            }
            console.log("-------------");
        }
        console.log(`${seedData.length} bản ghi đã được chèn vào cơ sở dữ liệu.`);
    }
    catch (error) {
        console.error("Lỗi khi seeding dữ liệu:", error);
    }
    finally {
        mongoose.disconnect();
    }
};
seedDatabase();
