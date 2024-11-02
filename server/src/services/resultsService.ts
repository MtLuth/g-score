import { error } from "console";
import csvParser from "csv-parser";
import { Readable } from "stream";
import Result, { IExamResult } from "~/models/result.js";
import AppError from "~/utils/appError.js";

class ResultsService {
  insertMany: any;
  async parseCSV(file: Buffer): Promise<IExamResult[]> {
    const results: IExamResult[] = [];

    const steam = Readable.from(file.toString());

    return new Promise((resolve, reject) => {
      steam
        .pipe(csvParser())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", () => reject(error));
    });
  }

  async saveResults(results: IExamResult[]): Promise<void> {
    await Result.insertMany(results);
  }

  async saveResult(result: IExamResult): Promise<void> {
    await Result.create(result);
  }

  async findResultOfStudent(sbd: string): Promise<any> {
    const result = Result.findOne({ sbd: sbd });
    return result;
  }
}

export default new ResultsService();
