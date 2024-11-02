import { NextFunction, Request, Response } from "express";
import resultsService from "~/services/resultsService.js";
import catchAsync from "~/utils/catchAsync.js";
class ResultsController {
  importData = catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const csvFile = req.file;
      if (!csvFile) {
        res.status(400).json({ message: "Tệp không được cung cấp." });
        return;
      }
      const results = await resultsService.parseCSV(csvFile.buffer);
      if (results !== null) {
        await resultsService.saveResults(results);
      }
      res.status(200).json({
        status: 200,
        message: "Nhập dữ liệu thành công",
      });
    }
  );
}

export default new ResultsController();
