import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashbord from "./Pages/Dashbord/Dashbord"; // Corrected spelling
import Players from "./Pages/players/players"; // Correctly import the Players component
import Login from "./Pages/Home/Login";
import Signup from "./Pages/Home/Signup";
import TeamSelection from "./Pages/MyTeam/TeamSelection";
import MyTeam from "./Pages/MyTeam/MyTeam";
// User Pages
import Home from "./Pages/Home/Home";

// Admin Pages
import AdminLogin from "./Pages/admin/AdminLogin";
import AdminSignup from "./Pages/admin/AdminSignup";
import AdminPlayers from "./Pages/admin/Players";
import PlayerStats from "./Pages/admin/PlayerStats";
import TournamentSummary from "./Pages/admin/TournamentSummary";
// Spiriter Page (Assuming this is another part of the app)
import Spiriter from "./Pages/Spiriter";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home Page */}
          <Route path="/dashbord" element={<Dashbord />} />
          {/* Dashboard Page */}
          <Route path="/players" element={<Players />} /> {/* Players Page */}
          {/* User Routes */}
          <Route path="/login" element={<Login />} /> {/* User Login Page */}
          
          <Route path="/signup" element={<Signup />} /> {/* User Signup Page */}
          
          <Route path="/TeamSelection" element={<TeamSelection />} /> {/* User Signup Page */}

          <Route path="/MyTeam" element={<MyTeam />} /> {/* User Signup Page */}

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* Admin Login Page */}
          <Route path="/admin/signup" element={<AdminSignup />} />
          {/* Admin Signup Page */}
          <Route path="/admin/players" element={<AdminPlayers />} />
          {/* Admin Players Management */}
          <Route path="/admin/player-stats" element={<PlayerStats />} />
          {/* Admin Player Stats */}
          <Route
            path="/admin/tournament-summary"
            element={<TournamentSummary />}
          />{" "}
          {/* Admin Tournament Summary */}
          {/* Spiriter Page */}
          <Route path="/spiriter" element={<Spiriter />} />{" "}
          {/* Spiriter Page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
