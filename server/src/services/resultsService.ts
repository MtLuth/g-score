import { error } from "console";
import csvParser from "csv-parser";
import { Readable } from "stream";
import Result, { IExamResult } from "~/models/result.js";
import AppError from "~/utils/appError.js";

interface SubjectResults {
  Gioi: number;
  Kha: number;
  TrungBinh: number;
  Yeu: number;
}

interface ResultsReport {
  [subject: string]: SubjectResults;
}

interface TopStudent {
  sbd: string;
  totalScore: number;
  toan: number | null;
  vat_li: number | null;
  hoa_hoc: number | null;
}

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

  async reportResults(): Promise<ResultsReport> {
    const subjects = [
      "toan",
      "ngu_van",
      "ngoai_ngu",
      "vat_li",
      "hoa_hoc",
      "sinh_hoc",
      "lich_su",
      "dia_li",
      "gdcd",
    ];

    const results: ResultsReport = {};

    for (const subject of subjects) {
      results[subject] = {
        Gioi: await Result.countDocuments({ [subject]: { $gte: 8 } }),
        Kha: await Result.countDocuments({ [subject]: { $lt: 8, $gte: 6 } }),
        TrungBinh: await Result.countDocuments({
          [subject]: { $lt: 6, $gte: 4 },
        }),
        Yeu: await Result.countDocuments({ [subject]: { $lt: 4 } }),
      };
    }

    return results;
  }

  async getTopAStudents(): Promise<any> {
    const topStudents = await Result.aggregate([
      {
        $project: {
          sbd: 1,
          toan: 1,
          vat_li: 1,
          hoa_hoc: 1,
          totalScore: {
            $add: [
              { $ifNull: ["$toan", 0] },
              { $ifNull: ["$vat_li", 0] },
              { $ifNull: ["$hoa_hoc", 0] },
            ],
          },
        },
      },
      {
        $sort: { totalScore: -1 }, // Sort by totalScore in descending order
      },
      {
        $limit: 10, // Limit to top 10 students
      },
    ]);

    // Tính tổng điểm cho mỗi học sinh
    const resultWithTotalScore = topStudents.map((student) => {
      const totalScore =
        (student.toan || 0) + (student.vat_li || 0) + (student.hoa_hoc || 0);
      return {
        sbd: student.sbd,
        totalScore,
        toan: student.toan,
        vat_li: student.vat_li,
        hoa_hoc: student.hoa_hoc,
      };
    });

    return resultWithTotalScore;
  }
}

export default new ResultsService();
