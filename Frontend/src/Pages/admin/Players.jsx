import React, { useState } from "react";
import PlayerCard from "../../components/PlayerCard.jsx";
import styles from './adminplayers.module.css';  // Import the CSS Module

const initialPlayers = [
  { id: 1, name: "Chamika Chandimal", university: "University of the Visual & Performing Arts", category: "Batsman", totalRuns: 530, ballsFaced: 588, inningsPlayed: 10, wickets: 0, oversBowled: 3, runsConceded: 21 },
  { id: 2, name: "Dimuth Dhananjaya", university: "University of the Visual & Performing Arts", category: "All-Rounder", totalRuns: 250, ballsFaced: 208, inningsPlayed: 10, wickets: 8, oversBowled: 40, runsConceded: 240 },
  { id: 3, name: "Avishka Mendis", university: "Eastern University", category: "All-Rounder", totalRuns: 210, ballsFaced: 175, inningsPlayed: 7, wickets: 7, oversBowled: 35, runsConceded: 210 },
  { id: 4, name: "Danushka Kumara", university: "University of the Visual & Performing Arts", category: "Batsman", totalRuns: 780, ballsFaced: 866, inningsPlayed: 15, wickets: 0, oversBowled: 5, runsConceded: 35 },
  { id: 5, name: "Praveen Vandersay", university: "Eastern University", category: "Batsman", totalRuns: 329, ballsFaced: 365, inningsPlayed: 7, wickets: 0, oversBowled: 3, runsConceded: 24 }
];

const Players = () => {
  const [players, setPlayers] = useState(initialPlayers);
  const [newPlayer, setNewPlayer] = useState({
    name: "", university: "", category: "", totalRuns: "", ballsFaced: "", inningsPlayed: "", wickets: "", oversBowled: "", runsConceded: ""
  });
  const [editPlayer, setEditPlayer] = useState(null);

  const handleChange = (e, setState) => {
    setState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createPlayer = () => {
    setPlayers([...players, { id: players.length + 1, ...newPlayer }]);
    setNewPlayer({ name: "", university: "", category: "", totalRuns: "", ballsFaced: "", inningsPlayed: "", wickets: "", oversBowled: "", runsConceded: "" });
  };

  const startEditing = (player) => {
    setEditPlayer(player);
  };

  const updatePlayer = () => {
    setPlayers(players.map(player => (player.id === editPlayer.id ? editPlayer : player)));
    setEditPlayer(null);
  };

  const deletePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  return (
    <div>
      <h1 className={styles.h1}>Players List</h1>
      
      {/* Create New Player Form */}
      <div className={styles.createPlayerForm}>
        <h2>Create New Player</h2>
        <input type="text" name="name" placeholder="Name" value={newPlayer.name} onChange={(e) => handleChange(e, setNewPlayer)} />
        <input type="text" name="university" placeholder="University" value={newPlayer.university} onChange={(e) => handleChange(e, setNewPlayer)} />
        <input type="text" name="category" placeholder="Category" value={newPlayer.category} onChange={(e) => handleChange(e, setNewPlayer)} />
        <input type="number" name="totalRuns" placeholder="Total Runs" value={newPlayer.totalRuns} onChange={(e) => handleChange(e, setNewPlayer)} />
        <input type="number" name="ballsFaced" placeholder="Balls Faced" value={newPlayer.ballsFaced} onChange={(e) => handleChange(e, setNewPlayer)} />
        <input type="number" name="inningsPlayed" placeholder="Innings Played" value={newPlayer.inningsPlayed} onChange={(e) => handleChange(e, setNewPlayer)} />
        <input type="number" name="wickets" placeholder="Wickets" value={newPlayer.wickets} onChange={(e) => handleChange(e, setNewPlayer)} />
        <input type="number" name="oversBowled" placeholder="Overs Bowled" value={newPlayer.oversBowled} onChange={(e) => handleChange(e, setNewPlayer)} />
        <input type="number" name="runsConceded" placeholder="Runs Conceded" value={newPlayer.runsConceded} onChange={(e) => handleChange(e, setNewPlayer)} />
        <button onClick={createPlayer}>Add Player</button>
      </div>

      {/* Edit Player Form */}
      {editPlayer && (
        <div className={styles.editPlayerForm}>
          <h2>Edit Player</h2>
          <label>Name</label>
          <input type="text" name="name" placeholder="Name" value={editPlayer.name} onChange={(e) => handleChange(e, setEditPlayer)} />
          
          <label>Total Runs</label>
          <input type="number" name="totalRuns" placeholder="Total Runs" value={editPlayer.totalRuns} onChange={(e) => handleChange(e, setEditPlayer)} />
          
          <label>Balls Faced</label>
          <input type="number" name="ballsFaced" placeholder="Balls Faced" value={editPlayer.ballsFaced} onChange={(e) => handleChange(e, setEditPlayer)} />
          
          <label>Innings Played</label>
          <input type="number" name="inningsPlayed" placeholder="Innings Played" value={editPlayer.inningsPlayed} onChange={(e) => handleChange(e, setEditPlayer)} />
          
          <label>Wickets</label>
          <input type="number" name="wickets" placeholder="Wickets" value={editPlayer.wickets} onChange={(e) => handleChange(e, setEditPlayer)} />
          
          <label>Overs Bowled</label>
          <input type="number" name="oversBowled" placeholder="Overs Bowled" value={editPlayer.oversBowled} onChange={(e) => handleChange(e, setEditPlayer)} />
          
          <label>Runs Conceded</label>
          <input type="number" name="runsConceded" placeholder="Runs Conceded" value={editPlayer.runsConceded} onChange={(e) => handleChange(e, setEditPlayer)} />
          
          <button onClick={updatePlayer}>Update Player</button>
          <button onClick={() => setEditPlayer(null)}>Cancel</button>
        </div>
      )}

      {/* Players List */}
      <div className={styles.playersList}>
        {players.map((player) => (
          <div className={styles.playerCard} key={player.id}>
            <PlayerCard player={player} />
            <div>
              <button onClick={() => startEditing(player)}>Edit</button>
              <button onClick={() => deletePlayer(player.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players;
