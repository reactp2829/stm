import fs from "fs";
import path from "path";
import { __dirname } from "../utils/dirname.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import csv from "csv-parser";
import { Transaction } from "../models/transaction.models.js";
import { UploadHistory } from "../models/uploadHistory.models.js";

export const uploadFile = async (req, res) => {
  const filePath = path.join(__dirname, "..", "uploads", req.file.filename);
  const transactions = [];
  try {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        const priceSplit = row["Price"].split(" ");
        const price = priceSplit[0];
        const priceCurrency = priceSplit[1];
        const parsedDate = new Date(row["Date"]);
        if (isNaN(parsedDate)) {
          console.error("Invalid date:", row["Date"]);
          return;
        }
       
        if (!isNaN(new Date(row["Date"]))) {
          transactions.push({
            transactionId: String(row["Transaction Id"]).replace(/^\uFEFF/, ""),
            customerName: row["Customer Name"],
            product: row["Product"],
            quantity: Number(row["Quantity"]),
            price: String(price),
            currency: String(priceCurrency),
            date: new Date(row["Date"]),
          });
        }
      })
      .on("end", async () => {
       await Transaction.insertMany(transactions);
        await UploadHistory.create({
          filename: req.file.filename,
          processedRows: transactions.length,
        });
        return res
          .status(200)
          .json(
            new ApiResponse(200, null, "File processed successfully", true)
          );
      });
  } catch (error) {
    console.log(error);
  }
};

export const getUploadFileData = async (req, res) => {
  try {
    const data = await Transaction.find().sort({ __id: -1 });
    if (!data) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, " No Data found", false));
    }
    return res
      .status(201)
      .json(new ApiResponse(201, data, "CSV file data", true));
  } catch (error) {
    console.log(error);
  }
};


export const getUploadHistoryData = async (req, res) => {
  try {
    const data = await UploadHistory.find().sort({ __id: -1 });
    if (!data) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, " No Data found", false));
    }
    return res
      .status(201)
      .json(new ApiResponse(201, data, "CSV file data", true));
  } catch (error) {
    console.log(error);
  }
};