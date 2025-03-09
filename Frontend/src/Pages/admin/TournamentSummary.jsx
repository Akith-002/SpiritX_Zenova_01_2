import React from "react";

const TournamentSummary = () => {
  const summaryStats = {
    totalRuns: 1000,
    totalWickets: 50,
    highestRunScorer: "Player 1",
    highestWicketTaker: "Player 2",
  };

  return (
    <div>
      <h1>Tournament Summary</h1>
      <div className="summary-stats">
        <p>Total Runs: {summaryStats.totalRuns}</p>
        <p>Total Wickets: {summaryStats.totalWickets}</p>
        <p>Highest Run Scorer: {summaryStats.highestRunScorer}</p>
        <p>Highest Wicket Taker: {summaryStats.highestWicketTaker}</p>
      </div>
    </div>
  );
};

export default TournamentSummary;
