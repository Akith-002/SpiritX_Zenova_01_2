import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const MyTeam = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div>
        <Navbar/>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-900">Cricket Titans</h1>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            ✏️ Edit Team
          </button>
        </div>

        <p className="text-gray-600">Manage your fantasy cricket team</p>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500">Total Points</p>
            <h2 className="text-3xl font-bold text-blue-900">1245</h2>
            <p className="text-blue-600">+15% from last match</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500">Current Rank</p>
            <h2 className="text-3xl font-bold text-blue-900">24</h2>
            <p className="text-gray-600">Top 10% of all teams</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-500">Team Value</p>
            <h2 className="text-3xl font-bold text-blue-900">$1750</h2>
            <p className="text-gray-600">Out of $1000 budget</p>
          </div>
        </div>

        {/* Team Players Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-900">Team Players</h2>
          <p className="text-gray-600">Your selected players and their performance</p>

          {/* Filters */}
          <div className="flex space-x-3 mt-4">
            <button className="bg-blue-700 text-white px-3 py-1 rounded-lg">All</button>
            <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg">Batsmen</button>
            <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg">Bowlers</button>
            <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg">All-rounders</button>
            <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg">Wicket-keepers</button>
          </div>

          {/* Player Cards */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            {/* Player 1 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-lg font-bold text-blue-900">Ashan Kumar</p>
              <p className="text-gray-500">Moratuwa University</p>
              <p className="text-gray-600">Role: Batsman</p>
              <p className="text-blue-600">Points: 342</p>
              <p className="text-blue-600 font-bold">Captain</p>
            </div>

            {/* Player 2 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-lg font-bold text-blue-900">Dinesh Priyantha</p>
              <p className="text-gray-500">Colombo University</p>
              <p className="text-gray-600">Role: All-rounder</p>
              <p className="text-blue-600">Points: 315</p>
              <p className="text-blue-600 font-bold">Vice Captain</p>
            </div>

            {/* Player 3 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-lg font-bold text-blue-900">Nuwan Perera</p>
              <p className="text-gray-500">Peradeniya University</p>
              <p className="text-gray-600">Role: Bowler</p>
              <p className="text-blue-600">Points: 298</p>
              <p className="text-blue-600">Form: Good</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
