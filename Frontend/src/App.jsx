import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// User Pages
import Home from "./Pages/Home/Home";
import Login from "./Pages/Home/Login";
import Signup from "./Pages/Home/Signup";

// Admin Pages
import AdminLogin from "./Pages/admin/AdminLogin";
import AdminSignup from "./Pages/admin/AdminSignup";
import Players from "./Pages/admin/Players";
import PlayerStats from "./Pages/admin/PlayerStats";
import TournamentSummary from "./Pages/admin/TournamentSummary";

// Spiriter Page (Assuming this is another part of the app)
import Spiriter from "./Pages/Spiriter";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Login />} /> {/* Home Page */}
          <Route path="/home" element={<Home />} /> {/* Home Page */}
          <Route path="/login" element={<Login />} /> {/* User Login Page */}
          <Route path="/signup" element={<Signup />} /> {/* User Signup Page */}
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />{" "}
          {/* Admin Login Page */}
          <Route path="/admin/signup" element={<AdminSignup />} />{" "}
          {/* Admin Signup Page */}
          <Route path="/admin/players" element={<Players />} />{" "}
          {/* Admin Players Management */}
          <Route path="/admin/player-stats" element={<PlayerStats />} />{" "}
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
