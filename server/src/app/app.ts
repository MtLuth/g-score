import express from "express";
import morgan from "morgan";
import router from "~/routes/examResultsRouter.js";

const app = express();

app.use(morgan("dev"));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/api/v1/exam-results", router);

export default app;
