import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Expense } from "../models/expenses.models.js";

// Create a new expense
const createExpense = asyncHandler(async (req, res) => {
  const { amount, category, customCategory = "", description, date } = req.body;

  if (!amount || !category || !date) {
    throw new ApiError(400, "Amount, category, and date are required");
  }

  const expense = await Expense.create({
    user: req.user._id,
    amount,
    category,
    customCategory: category === "Other" && customCategory.trim() ? customCategory.trim() : "",
    description,
    date,
  });

  res.status(201).json(new ApiResponse(201, expense, "Expense created successfully"));
});

// Get all expenses for a user
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });

  const response = expenses.map(exp => ({
    ...exp.toObject(),
    displayCategory: exp.category === "Other" && exp.customCategory ? exp.customCategory : exp.category
  }));

  res.status(200).json(new ApiResponse(200, response, "Expenses retrieved successfully"));
});

// Update an expense
const updateExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { amount, category, customCategory = "", description, date } = req.body;

  const updatedExpense = await Expense.findOneAndUpdate(
    { _id: id, user: req.user._id },
    {
      amount,
      category,
      customCategory: category === "Other" && customCategory.trim() ? customCategory.trim() : "",
      description,
      date,
    },
    { new: true }
  );

  if (!updatedExpense) {
    throw new ApiError(404, "Expense not found or unauthorized");
  }

  res.status(200).json(new ApiResponse(200, updatedExpense, "Expense updated successfully"));
});

// Delete an expense
const deleteExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await Expense.findOneAndDelete({ _id: id, user: req.user._id });

  if (!deleted) {
    throw new ApiError(404, "Expense not found or unauthorized");
  }

  res.status(200).json(new ApiResponse(200, {}, "Expense deleted successfully"));
});

export {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense
};
