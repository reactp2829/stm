import mongoose, { Schema } from "mongoose";
const uploadHistorySchema = new Schema({
  filename: String,
  uploadDate: { type: Date, default: Date.now },
  processedRows: Number,
});
export const UploadHistory = mongoose.model(
  "UploadHistory",
  uploadHistorySchema
);
