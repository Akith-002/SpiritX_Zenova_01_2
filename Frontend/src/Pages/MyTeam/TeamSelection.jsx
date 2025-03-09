import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeamSelection = () => {
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const MAX_TEAM_SIZE = 11;
  const MAX_BUDGET = 1000;

  // Fetch available players and current team on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all available players
        const playersResponse = await axios.get(
          "http://localhost:3000/api/players",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Fetch current team
        const username = localStorage.getItem("username");
        const teamResponse = await axios.get(
          `http://localhost:3000/api/teams/${username}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (teamResponse.data && teamResponse.data.members) {
          // Filter out players that are already in the team
          const teamPlayerIds = teamResponse.data.members;
          const currentTeamPlayers = playersResponse.data.filter((player) =>
            teamPlayerIds.includes(player._id)
          );

          setSelectedPlayers(currentTeamPlayers);
        }

        setAvailablePlayers(playersResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add player to selected team
  const addPlayer = (player) => {
    if (
      selectedPlayers.length < MAX_TEAM_SIZE &&
      !selectedPlayers.some((p) => p._id === player._id)
    ) {
      // Check if adding this player would exceed the budget
      const budgetUsed = selectedPlayers.reduce(
        (total, p) => total + p.price,
        0
      );
      if (budgetUsed + player.price > MAX_BUDGET) {
        setError("Adding this player would exceed your budget!");
        return;
      }

      setSelectedPlayers([...selectedPlayers, player]);
      setError(null);
    } else if (selectedPlayers.length >= MAX_TEAM_SIZE) {
      setError("You can't select more than 11 players!");
    } else {
      setError("This player is already in your team!");
    }
  };

  // Remove player from selected team
  const removePlayer = (playerId) => {
    setSelectedPlayers(
      selectedPlayers.filter((player) => player._id !== playerId)
    );
    setError(null);
  };

  // Save the team to the database
  const saveTeam = async () => {
    if (selectedPlayers.length !== MAX_TEAM_SIZE) {
      setError("You must select exactly 11 players!");
      return;
    }

    try {
      const username = localStorage.getItem("username");
      const playerIds = selectedPlayers.map((player) => player._id);

      // Check if team already exists
      try {
        await axios.get(`/api/teams/${username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Team exists, update it
        await axios.put(
          `/api/teams/${username}`,
          { members: playerIds },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (err) {
        // Team doesn't exist, create it
        if (err.response && err.response.status === 404) {
          await axios.post(
            "/api/teams",
            {
              username,
              members: playerIds,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        } else {
          throw err;
        }
      }

      // Navigate back to MyTeam page
      navigate("/myteam");
    } catch (err) {
      console.error("Error saving team:", err);
      setError("Failed to save team. Please try again.");
    }
  };

  const budgetUsed = selectedPlayers.reduce(
    (total, player) => total + player.price,
    0
  );
  const remainingBudget = MAX_BUDGET - budgetUsed;

  // Filter out players that are already selected
  const availablePlayersFiltered = availablePlayers.filter(
    (player) => !selectedPlayers.some((p) => p._id === player._id)
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div>
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Select Your Team
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Players */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              Available Players
            </h2>

            {loading ? (
              <p>Loading players...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 text-blue-900">
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
                    {availablePlayersFiltered.map((player) => (
                      <tr key={player._id} className="border-b">
                        <td className="p-2">{player.name}</td>
                        <td className="p-2">{player.university}</td>
                        <td className="p-2">{player.role}</td>
                        <td className="p-2">{player.stats || "N/A"}</td>
                        <td className="p-2">Rs. {player.price}</td>
                        <td className="p-2">
                          <button
                            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
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
            )}
          </div>

          {/* Team Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">
              Team Summary
            </h2>
            <div className="mb-4">
              <p className="text-lg font-semibold">
                Budget Used: Rs. {budgetUsed} / Rs. {MAX_BUDGET}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className={`h-2.5 rounded-full ${
                    budgetUsed > MAX_BUDGET ? "bg-red-600" : "bg-blue-600"
                  }`}
                  style={{
                    width: `${Math.min((budgetUsed / MAX_BUDGET) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <p className="mt-2">Remaining: Rs. {remainingBudget}</p>
            </div>

            <p className="text-lg font-semibold mb-2">
              Players Selected: {selectedPlayers.length} / {MAX_TEAM_SIZE}
            </p>

            {/* Selected players list */}
            <div className="mt-4 max-h-80 overflow-y-auto">
              {selectedPlayers.map((player) => (
                <div
                  key={player._id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <p className="font-medium">{player.name}</p>
                    <p className="text-sm text-gray-600">
                      {player.role} - Rs. {player.price}
                    </p>
                  </div>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => removePlayer(player._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              className={`w-full mt-6 px-4 py-3 rounded-lg transition ${
                selectedPlayers.length === MAX_TEAM_SIZE &&
                budgetUsed <= MAX_BUDGET
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-gray-300 text-gray-700 cursor-not-allowed"
              }`}
              disabled={
                selectedPlayers.length !== MAX_TEAM_SIZE ||
                budgetUsed > MAX_BUDGET
              }
              onClick={saveTeam}
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
