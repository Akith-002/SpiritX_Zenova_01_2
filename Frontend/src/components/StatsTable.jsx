import React from 'react';

const StatsTable = ({ stats }) => {
  return (
    <div className="stats-table">
      <h3>Player Statistics</h3>
      <table>
        <thead>
          <tr>
            <th>Stat</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Runs</td>
            <td>{stats.runs}</td>
          </tr>
          <tr>
            <td>Wickets</td>
            <td>{stats.wickets}</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>{stats.average}</td>
          </tr>
          {/* Add more rows for other stats if needed */}
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;
