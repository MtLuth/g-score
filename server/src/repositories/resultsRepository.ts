import Result, { IExamResult } from "~/models/result.js";

class ResultsRepository {
  async saveData(data: IExamResult[]): Promise<void> {
    try {
      await Result.insertMany(data);
    } catch (error) {
      throw new Error(`Không thể lưu vào cơ sở dữ liệu! ${error}`);
    }
  }
}

export default new ResultsRepository();
