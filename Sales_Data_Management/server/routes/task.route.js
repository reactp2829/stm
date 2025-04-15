import express from "express";
import {
  getAllProductList,
  getCustomerName,
  getTotalSales,
  amountSpendByCustomer
} from "../controllers/taskController.js";

const router = express.Router();
router.route("/customerName").get(getCustomerName);
router.route("/productList").get(getAllProductList);
router.route("/totalSales").get(getTotalSales);
router.route("/spentByCustomer").get(amountSpendByCustomer)

export default router;
