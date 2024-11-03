import express from "express";
import morgan from "morgan";
import globalErrorHandler from "~/controllers/globalErrorController.js";
import router from "~/routes/examResultsRouter.js";
import AppError from "~/utils/appError.js";
import cors from "cors";
const app = express();
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cors());
app.use("/api/v1/exam-results", router);
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
export default app;
