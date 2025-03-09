import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Budget = () => {
  const roleData = [
    { name: "Batsmen", value: 40, color: "#002855" },
    { name: "Bowlers", value: 31, color: "#00509E" },
    { name: "All-rounders", value: 21, color: "#6497B1" },
    { name: "Wicket-keepers", value: 8, color: "#9ACD32" },
  ];

  const universityData = [
    { name: "Colombo", value: 200 },
    { name: "Jaffna", value: 120 },
    { name: "Kelaniya", value: 60 },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="fixed w-48 bg-[#002855] min-h-screen text-white">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8 ml-48"> {/* Added ml-48 to make space for fixed navbar */}
        <h1 className="text-3xl font-bold text-[#002855]">Budget Management</h1>
        <p className="text-gray-600">Track and analyze your team budget allocation</p>

        {/* Budget Overview */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {[{ label: "Total Budget", value: "Rs. 9,000,000" }, { label: "Used Budget", value: "Rs. 7,500,000" }, { label: "Remaining Budget", value: "Rs. 2,500,000" }].map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-500">{item.label}</p>
              <h2 className="text-3xl font-bold text-[#002855]">{item.value}</h2>
            </div>
          ))}
        </div>

        {/* Budget Utilization Bar */}
        <div className="bg-white p-4 rounded-lg shadow mt-4">
          <p className="text-gray-500">Budget Utilization</p>
          <div className="w-full bg-gray-300 h-4 rounded-lg mt-2">
            <div className="bg-green-500 h-4 rounded-lg" style={{ width: "75%" }}></div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold text-[#002855]">Budget by Role</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={roleData} cx="50%" cy="50%" outerRadius={60} dataKey="value">
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold text-[#002855]">Budget by University</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={universityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#00509E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Player Budget Breakdown */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#002855]">Player Budget Breakdown</h2>
          <p className="text-gray-600">Detailed view of budget allocation for each player</p>

          {/* Filters */}
          <div className="flex space-x-3 mt-4">
            {["All Players", "Batsmen", "Bowlers", "All-rounders", "Wicket-keepers"].map((role, index) => (
              <button key={index} className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg hover:bg-[#00509E] hover:text-white">{role}</button>
            ))}
          </div>

          {/* Player Table */}
          <table className="w-full mt-4 bg-white shadow rounded-lg">
            <thead className="bg-[#002855] text-white">
              <tr>
                {["Player", "University", "Role", "Price", "% of Budget"].map((header, index) => (
                  <th key={index} className="p-3">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Added new rows here */}
              <tr className="border-b">
                <td className="p-3">Ashan Kumar</td>
                <td>Moratuwa University</td>
                <td>Batsman</td>
                <td>Rs. 150</td>
                <td>20%</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Rajitha Perera</td>
                <td>Colombo University</td>
                <td>Bowler</td>
                <td>Rs. 100</td>
                <td>13%</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Dinesh Jayawardena</td>
                <td>Jaffna University</td>
                <td>All-rounder</td>
                <td>Rs. 120</td>
                <td>16%</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Tharindu Silva</td>
                <td>Kelaniya University</td>
                <td>Wicket-keeper</td>
                <td>Rs. 80</td>
                <td>10%</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Chamindu Pathirana</td>
                <td>Moratuwa University</td>
                <td>Batsman</td>
                <td>Rs. 130</td>
                <td>17%</td>
              </tr>
              {/* You can continue adding more rows here as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Budget;
