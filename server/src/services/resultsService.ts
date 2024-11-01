import { error } from "console";
import csvParser from "csv-parser";
import { Readable } from "stream";
import { IExamResult } from "~/models/result.js";
import resultsRepository from "~/repositories/resultsRepository.js";

class ResultsService {
  insertMany: any;
  async parseCSV(file: Buffer): Promise<any> {
    const results: any[] = [];

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
    await resultsRepository.saveData(results);
  }
}

export default new ResultsService();
