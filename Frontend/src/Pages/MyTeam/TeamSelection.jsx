import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

const players = [
  { name: "Ashan Kumar", university: "Moratuwa University", role: "Batsman", stats: "Avg: 45.16, SR: 135.2", price: 150 },
  { name: "Dinesh Priyantha", university: "Colombo University", role: "All-rounder", stats: "Bat Avg: 26.66, Bowl Avg: 22.4", price: 180 },
  { name: "Nuwan Perera", university: "Peradeniya University", role: "Bowler", stats: "Wkts: 28, Econ: 6.32", price: 160 },
  { name: "Kasun Silva", university: "Jaffna University", role: "Wicket-keeper", stats: "Avg: 31.66, Dismissals: 15", price: 140 },
];

const TeamSelection = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const addPlayer = (player) => {
    if (selectedPlayers.length < 11 && !selectedPlayers.includes(player)) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const budgetUsed = selectedPlayers.reduce((total, player) => total + player.price, 0);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#2D336B] min-h-screen text-white">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-[#F4F6FF]">
        <h1 className="text-3xl font-bold text-center text-[#2D336B] mb-6">
          Select Your Team
        </h1>

        <div className="grid grid-cols-3 gap-6">
          {/* Available Players */}
          <div className="col-span-2 bg-[#A9B5DF] p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-[#2D336B] mb-4">
              Available Players
            </h2>
            <table className="w-full text-left">
              <thead className="bg-[#F4F6FF] text-[#2D336B]">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">University</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Stats</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.name} className="border-b border-[#F4F6FF]">
                    <td className="p-2">{player.name}</td>
                    <td className="p-2">{player.university}</td>
                    <td className="p-2">{player.role}</td>
                    <td className="p-2">{player.stats}</td>
                    <td className="p-2">${player.price}</td>
                    <td className="p-2">
                      <button
                        className="bg-[#2D336B] text-white px-4 py-2 rounded-lg hover:bg-[#7886C7] transition"
                        onClick={() => addPlayer(player)}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Team Summary */}
          <div className="bg-[#A9B5DF] p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-[#2D336B]">
              Team Summary
            </h2>
            <p className="mt-4">Budget Used: ${budgetUsed} / $1000</p>
            <p>Players Selected: {selectedPlayers.length} / 11</p>
            <button
              className={`w-full mt-6 px-4 py-2 rounded-lg transition ${
                selectedPlayers.length === 11
                  ? "bg-[#2D336B] text-white hover:bg-[#20285A]"
                  : "bg-[#F4F6FF] text-[#2D336B] cursor-not-allowed"
              }`}
              disabled={selectedPlayers.length !== 11}
            >
              Save Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSelection;
