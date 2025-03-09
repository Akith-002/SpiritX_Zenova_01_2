import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyTeam = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [stats, setStats] = useState({
    totalPoints: 0,
    rank: 0,
    teamValue: 0,
  });

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const username = localStorage.getItem("username");

        if (!username) {
          // Handle case where user is not logged in
          setError("User not logged in. Please login first.");
          setLoading(false);
          return;
        }

        // Fetch team data
        try {
          const teamResponse = await axios.get(
            `http://localhost:3000/api/teams/${username}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          setTeam(teamResponse.data);

          if (
            teamResponse.data &&
            teamResponse.data.members &&
            teamResponse.data.members.length > 0
          ) {
            // Rest of your code for fetching player details...
          }
        } catch (teamErr) {
          // Specifically handle 404 (no team exists)
          if (teamErr.response && teamErr.response.status === 404) {
            // Team doesn't exist - set team to null which will show the "create team" message
            setTeam(null);
          } else {
            // Some other error occurred
            throw teamErr;
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching team data:", err);
        setError("Failed to load team data. Please try again.");
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const handleRemovePlayer = async (playerId) => {
    try {
      const username = localStorage.getItem("username");
      const updatedMembers = team.members.filter((id) => id !== playerId);

      // Update team in the database
      await axios.put(
        `/api/teams/${username}`,
        { members: updatedMembers },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update local state
      setTeam({ ...team, members: updatedMembers });
      setPlayers(players.filter((player) => player._id !== playerId));

      // Update team stats
      const removedPlayer = players.find((player) => player._id === playerId);
      setStats({
        ...stats,
        teamValue: stats.teamValue - removedPlayer.price,
        totalPoints: stats.totalPoints - (removedPlayer.points || 0),
      });
    } catch (err) {
      console.error("Error removing player:", err);
      setError("Failed to remove player. Please try again.");
    }
  };

  const filteredPlayers =
    filter === "All"
      ? players
      : players.filter((player) => player.role === filter);

  // Get captain and vice-captain (assuming first two players for now)
  const captain = players[0];
  const viceCaptain = players[1];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div>
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-900">Cricket Titans</h1>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={() => navigate("/TeamSelection")}
          >
            ✏️ Edit Team
          </button>
        </div>

        <p className="text-gray-600">Manage your fantasy cricket team</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 text-center">Loading team data...</div>
        ) : !team ? (
          <div className="mt-8 text-center">
            <p className="text-xl">You haven't created a team yet!</p>
            <button
              className="mt-4 bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
              onClick={() => navigate("/TeamSelection")}
            >
              Create Your Team
            </button>
          </div>
        ) : (
          <>
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-500">Total Points</p>
                <h2 className="text-3xl font-bold text-blue-900">
                  {stats.totalPoints}
                </h2>
                <p className="text-blue-600">Based on player performance</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-500">Current Rank</p>
                <h2 className="text-3xl font-bold text-blue-900">
                  {stats.rank}
                </h2>
                <p className="text-gray-600">Top 10% of all teams</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-500">Team Value</p>
                <h2 className="text-3xl font-bold text-blue-900">
                  Rs. {stats.teamValue}
                </h2>
                <p className="text-gray-600">Out of Rs.1000 budget</p>
              </div>
            </div>

            {/* Team Players Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-blue-900">Team Players</h2>
              <p className="text-gray-600">
                Your selected players and their performance
              </p>

              {/* Filters */}
              <div className="flex flex-wrap space-x-2 mt-4">
                <button
                  className={`mb-2 ${
                    filter === "All"
                      ? "bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-700"
                  } px-3 py-1 rounded-lg`}
                  onClick={() => setFilter("All")}
                >
                  All
                </button>
                <button
                  className={`mb-2 ${
                    filter === "Batsman"
                      ? "bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-700"
                  } px-3 py-1 rounded-lg`}
                  onClick={() => setFilter("Batsman")}
                >
                  Batsmen
                </button>
                <button
                  className={`mb-2 ${
                    filter === "Bowler"
                      ? "bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-700"
                  } px-3 py-1 rounded-lg`}
                  onClick={() => setFilter("Bowler")}
                >
                  Bowlers
                </button>
                <button
                  className={`mb-2 ${
                    filter === "All-rounder"
                      ? "bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-700"
                  } px-3 py-1 rounded-lg`}
                  onClick={() => setFilter("All-rounder")}
                >
                  All-rounders
                </button>
                <button
                  className={`mb-2 ${
                    filter === "Wicket-keeper"
                      ? "bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-700"
                  } px-3 py-1 rounded-lg`}
                  onClick={() => setFilter("Wicket-keeper")}
                >
                  Wicket-keepers
                </button>
              </div>

              {/* Player Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredPlayers.map((player, index) => (
                  <div
                    key={player._id}
                    className="bg-white p-4 rounded-lg shadow relative"
                  >
                    <button
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      onClick={() => handleRemovePlayer(player._id)}
                      title="Remove player"
                    >
                      ✕
                    </button>
                    <p className="text-lg font-bold text-blue-900">
                      {player.name}
                    </p>
                    <p className="text-gray-500">{player.university}</p>
                    <p className="text-gray-600">Role: {player.role}</p>
                    <p className="text-blue-600">
                      Points: {player.points || 0}
                    </p>
                    {player._id === captain?._id && (
                      <p className="text-blue-600 font-bold">Captain</p>
                    )}
                    {player._id === viceCaptain?._id && (
                      <p className="text-blue-600 font-bold">Vice Captain</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyTeam;
