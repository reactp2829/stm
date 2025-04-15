import express from "express";
import upload from "../utils/multer.js";
import {
  uploadFile,
  getUploadFileData,
  getUploadHistoryData,
} from "../controllers/fileUpload.controller.js";

const router = express.Router();
router.route("/fileupload").post(upload.single("file"), uploadFile);
router.route("/allRecords").get(getUploadFileData);
router.route("/uploadedData").get(getUploadHistoryData);

export default router;
