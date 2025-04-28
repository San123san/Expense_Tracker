import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "registration",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Food",
      "Transport",
      "Utilities",
      "Entertainment",
      "Healthcare",
      "Shopping",
      "Education",
      "Other"
    ],
  },
  customCategory: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

export const Expense = mongoose.model("Expense", expenseSchema);
