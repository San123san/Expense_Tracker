import React from "react";
import { useNavigate } from "react-router-dom";
import Expenses from "../components/Expenses.jsx";
import axios from "axios";

const Page1 = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/v1/users/logout", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        navigate("/home"); 
      }
    } catch (error) {
      console.error("Error during logout:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-blue-400 to-purple-500 min-h-screen flex flex-col text-white">
      {/* Navbar */}
      <header className="bg-white shadow-xl py-6 sticky top-0 z-50 rounded-b-xl">
        <div className="container mx-auto flex justify-between items-center px-6">
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-black text-2xl font-medium hover:underline">Home</a>
          </nav>
          <nav className="flex space-x-4">
            <button
              onClick={handleLogout}
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
            >
              Sign Out
            </button>
          </nav>
        </div>
      </header>

      {/* Expenses Section (Fixed Size with Scroll) */}
      <main className="flex-grow overflow-auto mt-8 px-4 py-8 bg-gray-100 rounded-xl shadow-md">

        {/* Wrap Expenses in a box with fixed height and width */}
        <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-center items-center mb-4">
            <p className="text-red-600 text-sm italic bg-red-100 p-3 rounded-lg border-l-4 border-red-500">
              *Your expenses are displayed in reverse chronological order, starting with the most recent entry and moving backwards to the earliest.*
            </p>
          </div>

          <Expenses />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-gray-200 py-8 mt-8">
        <div className="container mx-auto text-center space-y-4">
          <p>&copy; 2025 Expense Tracker. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Contact Us</a>
          </div>
          <form className="max-w-md mx-auto mt-6">
            <label htmlFor="newsletter" className="block mb-2 text-gray-100">
              Subscribe to our newsletter:
            </label>
            <div className="flex">
              <input
                type="email"
                id="newsletter"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md shadow-md transition duration-300 hover:bg-blue-600 active:bg-blue-700 focus:outline-none cursor-pointer">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default Page1;