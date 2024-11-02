import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import AppError from "~/utils/appError.js";

const globalErrorHandler = (
  err: AppError | MulterError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  if (err instanceof MulterError) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

export default globalErrorHandler;
