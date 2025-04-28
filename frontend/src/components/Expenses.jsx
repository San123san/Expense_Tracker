import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const categoryOptions = [
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Education",
  "Other",
];

const Expenses = () => {
  const navigate = useNavigate();
  
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [currentExpense, setCurrentExpense] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    customCategory: "",
    description: "",
    date: "",
  });

  const token = localStorage.getItem("accessToken");

  const fetchExpenses = async () => {
    try {
      const res = await axios.post("/api/v1/expenses/getExpenses", {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      setExpenses(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch expenses:", err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleOpenModal = (mode, expense = null) => {
    setModalMode(mode);
    setCurrentExpense(expense);
    setFormData(
      expense
        ? {
            amount: expense.amount,
            category: expense.category,
            customCategory: expense.customCategory || "",
            description: expense.description,
            date: expense.date?.split("T")[0],
          }
        : {
            amount: "",
            category: "",
            customCategory: "",
            description: "",
            date: "",
          }
    );
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalMode("");
    setCurrentExpense(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // Validation: check if all required fields are filled
    if (!formData.amount || !formData.category || !formData.description || !formData.date) {
      toast.error("Please fill all the fields including category, amount, description, and date!");
      return;
    }
    
    // If the category is "Other" and the customCategory is empty, show error
    if (formData.category === "Other" && !formData.customCategory) {
      toast.error("Please fill the custom category!");
      return;
    }

    try {
      if (modalMode === "add") {
        await axios.post("/api/v1/expenses/createExpense", formData, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
      } else if (modalMode === "edit") {
        await axios.post(`/api/v1/expenses/updateExpense/${currentExpense._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
      } else if (modalMode === "delete") {
        await axios.post(`/api/v1/expenses/deleteExpense/${currentExpense._id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
      }
      fetchExpenses();
      handleCloseModal();
    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">Expenses Tracker</h1>

      <div className="flex justify-between mb-4">
        <button
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          onClick={() => handleOpenModal("add")}
        >
          <i className="fas fa-plus"></i> Add Expense
        </button>
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          onClick={() => navigate("/home/Page1/ChartInfo")}
        >
          <i className="fas fa-chart-pie"></i> Show Chart
        </button>
      </div>

      <div className="overflow-auto max-h-[70vh] space-y-4 pb-4">
        {expenses.map((expense) => (
          <div
            key={expense._id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-4 border border-gray-200 hover:shadow-xl transition duration-300"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {(expense.displayCategory || expense.category)} - ₹{expense.amount}
              </h2>
              <p className="text-gray-600">{expense.description}</p>
              <small className="text-gray-400">
                {new Date(expense.date).toLocaleDateString()}
              </small>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-yellow-500 px-4 py-2 rounded-lg text-white hover:bg-yellow-600 transition duration-300"
                onClick={() => handleOpenModal("edit", expense)}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition duration-300"
                onClick={() => handleOpenModal("delete", expense)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {modalMode === "add" && "Add Expense"}
              {modalMode === "edit" && "Edit Expense"}
              {modalMode === "delete" && "Delete Expense"}
            </h2>
            {modalMode === "delete" ? (
              <div>
                <p className="text-gray-600">Are you sure you want to delete this expense?</p>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300"
                    onClick={handleSubmit}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <form>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleFormChange}
                    className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.category === "Other" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 text-gray-700">Custom Category</label>
                    <input
                      type="text"
                      name="customCategory"
                      value={formData.customCategory}
                      onChange={handleFormChange}
                      className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                    />
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                  />
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    type="button"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
                    onClick={handleSubmit}
                  >
                    {modalMode === "add" && "Add"}
                    {modalMode === "edit" && "Update"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Expenses;
