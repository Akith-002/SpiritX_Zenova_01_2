import React from "react";
import PlayerCard from "../../components/PlayerCard.jsx";

const Players = () => {
  // Sample players data, replace with dynamic data
  const players = [
    { id: 1, name: "Player 1", role: "Batsman", stats: "100 runs" },
    { id: 2, name: "Player 2", role: "Bowler", stats: "5 wickets" },
    // more players here
  ];

  return (
    <div>
      <h1>Players List</h1>
      <div className="players-list">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default Players;
