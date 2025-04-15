import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.models.js";
export const getCustomerName = async (req, res) => {
  try {
    const result = await Transaction.distinct("customerName");
    if (result) {
      return res
        .status(201)
        .json(new ApiResponse(201, result, "CustomerData", true));
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getAllProductList = async (req, res) => {
  try {
    const uniqueProductList = await Transaction.distinct("product");
    if (uniqueProductList) {
      return res
        .status(201)
        .json(new ApiResponse(201, uniqueProductList, "CustomerData", true));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTotalSales = async (req, res) => {
  try {
    const sales = await Transaction.aggregate([
      {
        $addFields: {
          priceNum: { $toDouble: "$price" },
          quantityNum: { $toDouble: "$quantity" },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: { $multiply: ["$priceNum", "$quantityNum"] } },
        },
      },
    ]);
    return res
      .status(201)
      .json(new ApiResponse(201, sales, "Total Sales", true));
  } catch (error) {
    console.log(error);
  }
};

export const amountSpendByCustomer = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      {
        $addFields: {
          priceNum: { $toDouble: "$price" },
          quantityNum: { $toDouble: "$quantity" },
        },
      },
      {
        $group: {
          _id: "$customerName",
          totalSpent: { $sum: { $multiply: ["$priceNum", "$quantityNum"] } },
        },
      },
      {
        $sort: {
          totalSpent: -1,
        },
      }
    ]);
    return res
      .status(201)
      .json(new ApiResponse(201, result, "Total Spent", true));
  } catch (error) {
    console.log(error);
  }
};
