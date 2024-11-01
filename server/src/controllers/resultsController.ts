import { Request, Response } from "express";
import resultsService from "~/services/resultsService.js";

class ResultsController {
  async importData(req: Request, res: Response): Promise<void> {
    try {
      const csvFile = req.file;
      if (!csvFile) {
        res.status(400).json({ message: "Tệp không được cung cấp." });
        return;
      }
      const results = await resultsService.parseCSV(csvFile.buffer);
      if (results !== null) {
        await resultsService.saveResults(results);
      }
      res.status(200).json("Nhập dữ liệu thành công");
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Đã xảy ra lỗi khi nhập dữ liệu.",
        error: error,
      });
    }
  }
}

export default new ResultsController();
