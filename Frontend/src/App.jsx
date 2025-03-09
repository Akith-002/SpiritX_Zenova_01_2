import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashbord from "./Pages/Dashbord/Dashbord"; // Corrected spelling
import Players from "./Pages/players/players"; // Correctly import the Players component

// User Pages
import Home from "./Pages/Home/Home";
import Login from "./Pages/Home/Login";
import Signup from "./Pages/Home/Signup";

// Admin Pages
import AdminLogin from "./Pages/admin/AdminLogin";
import AdminSignup from "./Pages/admin/AdminSignup";
import AdminPlayers from "./Pages/admin/Players";
import AdminPlayerStats from "./Pages/admin/PlayerStats"; // Ensure correct import
import TournamentSummary from "./Pages/admin/TournamentSummary";

// Spiriter Page
import Spiriter from "./Pages/Spiriter";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} /> 
          <Route path="/dashbord" element={<Dashbord />} />
          <Route path="/players" element={<Players />} /> 
          <Route path="/home" element={<Home />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} /> 

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/players" element={<AdminPlayers />} />
          <Route path="/admin/player-stats" element={<AdminPlayerStats />} />
          <Route path="/admin/tournament-summary" element={<TournamentSummary />} />

          {/* Spiriter Page */}
          <Route path="/spiriter" element={<Spiriter />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
