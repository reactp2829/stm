import mongoose, { Schema } from "mongoose";
const transactionSchema = new Schema({
  transactionId: String,
  customerName: String,
  product: String,
  quantity: Number,
  price: String,
  currency: String,
  date: Date,
});
export const Transaction = mongoose.model("Transaction", transactionSchema);
