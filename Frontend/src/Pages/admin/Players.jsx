import React, { useState } from "react";
import PlayerCard from "../../components/PlayerCard.jsx";
import "./Players.css"; // Import the CSS file for styles

const Players = () => {
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: "Chamika Chandimal",
      university: "University of the Visual & Performing Arts",
      category: "Batsman",
      totalRuns: 530,
      inningsPlayed: 10,
      wickets: 0,
      oversBowled: 8,
      runsConceded: 21
    },
    {
      id: 2,
      name: "Dimuth Dhananjaya",
      university: "University of the Visual & Performing Arts",
      category: "All-Rounder",
      totalRuns: 250,
      inningsPlayed: 10,
      wickets: 5,
      oversBowled: 11,
      runsConceded: 240
    },
    // Add more players similarly
  ]);

  const [newPlayer, setNewPlayer] = useState({
    name: "",
    university: "",
    category: "",
    totalRuns: "",
    inningsPlayed: "",
    wickets: "",
    oversBowled: "",
    runsConceded: ""
  });

  // Create player function
  const createPlayer = () => {
    setPlayers([
      ...players,
      {
        id: players.length + 1,
        name: newPlayer.name,
        university: newPlayer.university,
        category: newPlayer.category,
        totalRuns: newPlayer.totalRuns,
        inningsPlayed: newPlayer.inningsPlayed,
        wickets: newPlayer.wickets,
        oversBowled: newPlayer.oversBowled,
        runsConceded: newPlayer.runsConceded
      }
    ]);
    setNewPlayer({
      name: "",
      university: "",
      category: "",
      totalRuns: "",
      inningsPlayed: "",
      wickets: "",
      oversBowled: "",
      runsConceded: ""
    }); // Reset the form
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
          placeholder="University"
          value={newPlayer.university}
          onChange={(e) => setNewPlayer({ ...newPlayer, university: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newPlayer.category}
          onChange={(e) => setNewPlayer({ ...newPlayer, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Total Runs"
          value={newPlayer.totalRuns}
          onChange={(e) => setNewPlayer({ ...newPlayer, totalRuns: e.target.value })}
        />
        <input
          type="number"
          placeholder="Innings Played"
          value={newPlayer.inningsPlayed}
          onChange={(e) => setNewPlayer({ ...newPlayer, inningsPlayed: e.target.value })}
        />
        <input
          type="number"
          placeholder="Wickets"
          value={newPlayer.wickets}
          onChange={(e) => setNewPlayer({ ...newPlayer, wickets: e.target.value })}
        />
        <input
          type="number"
          placeholder="Overs Bowled"
          value={newPlayer.oversBowled}
          onChange={(e) => setNewPlayer({ ...newPlayer, oversBowled: e.target.value })}
        />
        <input
          type="number"
          placeholder="Runs Conceded"
          value={newPlayer.runsConceded}
          onChange={(e) => setNewPlayer({ ...newPlayer, runsConceded: e.target.value })}
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
