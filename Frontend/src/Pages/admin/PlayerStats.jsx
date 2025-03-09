import React from "react";
import StatsTable from "../../components/StatsTable";

const PlayerStats = () => {
  const playerStats = {
    name: "Player 1",
    runs: 100,
    wickets: 5,
    average: 35.0,
    // other stats
  };

  return (
    <div>
      <h1>{playerStats.name} - Player Stats</h1>
      <StatsTable stats={playerStats} />
    </div>
  );
};

export default PlayerStats;
