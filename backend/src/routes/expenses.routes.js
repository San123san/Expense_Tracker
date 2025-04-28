import { Router } from "express";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense
} from "../controllers/expenses.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/createExpense").post(verifyJWT, createExpense);
router.route("/getExpenses").post(verifyJWT, getExpenses);
router.route("/updateExpense/:id").post(verifyJWT, updateExpense);
router.route("/deleteExpense/:id").post(verifyJWT, deleteExpense);

export default router;
