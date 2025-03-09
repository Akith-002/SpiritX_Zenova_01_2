import React, { useState } from "react";
import PlayerCard from "../../components/PlayerCard.jsx";
import "./Players.css"; // Import the CSS file for styles

const Players = () => {
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", role: "Batsman", stats: "100 runs" },
    { id: 2, name: "Player 2", role: "Bowler", stats: "5 wickets" },
  ]);

  const [newPlayer, setNewPlayer] = useState({ name: "", role: "", stats: "" });

  // Create player function
  const createPlayer = () => {
    setPlayers([
      ...players,
      { id: players.length + 1, name: newPlayer.name, role: newPlayer.role, stats: newPlayer.stats }
    ]);
    setNewPlayer({ name: "", role: "", stats: "" }); // Reset the form
  };

  // Delete player function
  const deletePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  // Update player function (simple update for demonstration)
  const updatePlayer = (id, updatedData) => {
    setPlayers(players.map(player =>
      player.id === id ? { ...player, ...updatedData } : player
    ));
  };

  return (
    <div>
      <h1>Players List</h1>

      {/* Create Player Form */}
      <div className="create-player-form">
        <h2>Create New Player</h2>
        <input
          type="text"
          placeholder="Name"
          value={newPlayer.name}
          onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={newPlayer.role}
          onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}
        />
        <input
          type="text"
          placeholder="Stats"
          value={newPlayer.stats}
          onChange={(e) => setNewPlayer({ ...newPlayer, stats: e.target.value })}
        />
        <button onClick={createPlayer}>Add Player</button>
      </div>

      <div className="players-list">
        {players.map((player) => (
          <div className="player-card" key={player.id}>
            <PlayerCard player={player} />
            <div>
              <button onClick={() => updatePlayer(player.id, { name: "Updated Player" })}>
                Update
              </button>
              <button onClick={() => deletePlayer(player.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players;
