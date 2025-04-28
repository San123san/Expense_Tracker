import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChartInfo = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.post('https://expense-tracker-1-rke4.onrender.com/api/v1/expenses/getExpenses', {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch expenses:', err.response?.data?.message || err.message);
      }
    };
    fetchExpenses();
  }, [token]);

  const filteredExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    return (!selectedYear || expDate.getFullYear() === parseInt(selectedYear)) &&
           (!selectedMonth || expDate.getMonth() + 1 === parseInt(selectedMonth));
  });

  // === Pie Chart Logic ===
  const expensesGroupedByCategory = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});
  const pieScaledData = Object.values(expensesGroupedByCategory).map(val => Math.log10(val));
  const pieData = {
    labels: Object.keys(expensesGroupedByCategory),
    datasets: [
      {
        data: pieScaledData,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#C9CBCF', '#B1FF72',
        ],
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#C9CBCF', '#B1FF72',
        ],
      },
    ],
  };
  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const category = tooltipItem.label;
            const actualValue = expensesGroupedByCategory[category];
            return `${category}: ₹${actualValue}`;
          },
        },
      },
    },
  };

  // === Bar Chart Logic ===
  const expensesGroupedByTime = filteredExpenses.reduce((acc, expense) => {
    const expDate = new Date(expense.date);
    const timeLabel = selectedYear && selectedMonth
      ? expDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) // e.g., "18 Apr"
      : selectedYear
      ? expDate.toLocaleString('default', { month: 'short' }) // e.g., "Apr"
      : expDate.getFullYear().toString(); // e.g., "2025"

    acc[timeLabel] = (acc[timeLabel] || 0) + expense.amount;
    return acc;
  }, {});

  // Sort labels
  const sortedLabels = Object.keys(expensesGroupedByTime).sort((a, b) => {
    if (selectedYear && selectedMonth) {
      return new Date(`${a} ${selectedYear}`) - new Date(`${b} ${selectedYear}`);
    }
    if (selectedYear) {
      const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return monthOrder.indexOf(a) - monthOrder.indexOf(b);
    }
    return parseInt(a) - parseInt(b);
  });

  const barData = {
    labels: sortedLabels,
    datasets: [
      {
        label: 'Total Expenses',
        data: sortedLabels.map(label => expensesGroupedByTime[label]),
        backgroundColor: '#82ca9d',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        type: 'logarithmic',
        ticks: {
          callback: (value) => `₹${value}`,
        },
        title: {
          display: true,
          text: 'Expenses (₹)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `₹${tooltipItem.raw}`,
        },
      },
    },
  };

  const distinctYears = [...new Set(expenses.map(exp => new Date(exp.date).getFullYear()))];
  const distinctMonths = selectedYear
    ? [...new Set(expenses
        .filter(exp => new Date(exp.date).getFullYear() === parseInt(selectedYear))
        .map(exp => new Date(exp.date).getMonth() + 1))]
    : [...new Set(expenses.map(exp => new Date(exp.date).getMonth() + 1))];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Close Button */}
      <div className="text-left mb-6">
        <button
          className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          onClick={() => navigate('/home/Page1')}
        >
          Close
        </button>
      </div>

      <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">Expenses Dashboard</h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <select
          className="border border-gray-300 rounded-lg px-4 py-2"
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            setSelectedMonth('');
          }}
        >
          <option value="">All Years</option>
          {distinctYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        {selectedYear && (
          <select
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {distinctMonths.map(month => (
              <option key={month} value={month}>{monthNames[month - 1]}</option>
            ))}
          </select>
        )}
      </div>

      <div className="flex flex-wrap justify-around items-start gap-6 mb-6">
        {/* Small Pie Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Total Expenses by Category</h2>
          <div style={{ width: '300px', margin: '0 auto' }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
          <table className="mt-6 w-full table-auto text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 px-4 py-2">Category</th>
                <th className="border-b-2 px-4 py-2">Total Expenses</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(expensesGroupedByCategory).map(([category, amount]) => (
                <tr key={category}>
                  <td className="border-b px-4 py-2">{category}</td>
                  <td className="border-b px-4 py-2">₹{amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Total Expenses Over Time</h2>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartInfo;