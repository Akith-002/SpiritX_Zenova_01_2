import React from 'react';

const PlayerCard = ({ player }) => {
  return (
    <div className="player-card">
      <h3>{player.name}</h3>
      <p>University: {player.university}</p>
      <p>Category: {player.category}</p>
      <p>Total Runs: {player.totalRuns}</p>
      <p>Innings Played: {player.inningsPlayed}</p>
      <p>Wickets: {player.wickets}</p>
      <p>Overs Bowled: {player.oversBowled}</p>
      <p>Runs Conceded: {player.runsConceded}</p>
    </div>
  );
};

export default PlayerCard;
