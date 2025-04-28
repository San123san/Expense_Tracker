import React from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-tr from-green-400 to-yellow-300 flex flex-col text-gray-900">
      {/* Navbar */}
      <header className="bg-white shadow-md py-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-black text-2xl font-medium hover:underline">Home</a>
          </nav>
          <nav className="flex space-x-4">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 hover:bg-blue-600 
            active:bg-blue-700 focus:outline-none cursor-pointer"
            onClick={() => navigate("/home/signin")}>
              Sign In
            </button>
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 hover:bg-green-600 
            active:bg-green-700 focus:outline-none cursor-pointer"
            onClick={() => navigate("/home/signup")}>
              Sign Up
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center text-center px-4 md:px-8">
        <div className="space-y-6">
          <h1 className="text-green-800 text-4xl font-bold">Expense Tracker</h1>
          <h2 className="text-6xl font-extrabold animate-fade-in">
            Simplify Your Financial Management
          </h2>
          <p className="text-lg text-gray-800 max-w-xl mx-auto">
            Keep your expenses in check with an easy-to-use and visually appealing platform.
          </p>
          <div className="flex justify-center py-4">
            <button className="bg-white text-green-800 px-8 py-3 rounded-lg shadow-md transition duration-300 hover:bg-green-100 
            active:bg-green-200 focus:outline-none cursor-pointer"
            onClick={() => navigate("/home/signup")}>
              Get Started
            </button>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-12 bg-gray-100 text-gray-800">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-semibold text-center mb-8">Why Choose Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h4 className="text-green-800 font-bold text-xl mb-4">Easy to Use</h4>
              <p>Intuitive interface that lets you track your expenses with ease.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h4 className="text-green-800 font-bold text-xl mb-4">Detailed Insights</h4>
              <p>Get actionable insights about your spending habits.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h4 className="text-green-800 font-bold text-xl mb-4">Secure Platform</h4>
              <p>Your data is safe with industry-standard encryption.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-gray-200 py-8">
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
}

export default App;
