import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;

    if (!username || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/api/v1/users/register", formData);
      const { message } = response.data;

      toast.success(
        // message || 
        "User registered successfully! Please sign in.");

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Create Your Account</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white px-8 py-6 rounded-lg shadow-md max-w-md w-full"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Your username"
            value={formData.username}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default SignUp;