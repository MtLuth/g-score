import { Router } from "express";
import app from "~/app/app.js";
import * as express from "express";
import multer from "multer";
import resultsController from "~/controllers/resultsController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), resultsController.importData);
router.get("/:sbd", resultsController.findResultBySBD);
router.get("/report/:topic", resultsController.reportResults);
export default router;
