import { NextFunction, Request, Response } from "express";
import { IExamResult } from "~/models/result.js";
import resultsService from "~/services/resultsService.js";
import AppError from "~/utils/appError.js";

class ResultsController {
  async importData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const csvFile = req.file;
      if (!csvFile) {
        res.status(400).json({ message: "Tệp không được cung cấp." });
        return;
      }
      const results = await resultsService.parseCSV(csvFile.buffer);
      if (results !== null) {
        await Promise.all(
          results.map(
            async (result: IExamResult) =>
              await resultsService.saveResult(result)
          )
        );
      }
      res.status(200).json({
        status: 200,
        message: "Nhập dữ liệu thành công",
      });
    } catch (error) {
      next(new AppError(`Lỗi ${error}`, 500));
    }
  }

  async findResultBySBD(req: Request, res: Response, next: NextFunction) {
    try {
      let sbd = req.params.sbd;
      const result = await resultsService.findResultOfStudent(sbd);
      if (result == null) {
        return next(new AppError("Số báo danh không hợp lệ!", 400));
      }
      res.status(200).json({
        status: 200,
        data: result,
      });
    } catch (error) {
      return next(new AppError(`Lỗi: ${error}`, 500));
    }
  }
}

export default new ResultsController();
