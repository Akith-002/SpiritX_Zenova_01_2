import React from 'react';

const PlayerCard = ({ player }) => {
  return (
    <div className="player-card">
      <h3>{player.name}</h3>
      <p>Role: {player.role}</p>
      <p>Stats: {player.stats}</p>
      {/* You can add more details about the player here */}
    </div>
  );
};

export default PlayerCard;
