import * as express from "express";
import multer from "multer";
import resultsController from "./../controllers/resultsController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), resultsController.importData);
router.get("/search/:sbd", resultsController.findResultBySBD);
router.get("/report", resultsController.reportResults);
router.get("/top-10-A", resultsController.topGradeAStudents);
export default router;
