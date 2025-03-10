import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashbord from "./Pages/Dashbord/Dashbord"; // Corrected spelling
import Players from "./Pages/players/players"; // Correctly import the Players component
// User Pages
import Home from "./Pages/Home/Home";
import Login from "./Pages/Home/Login";
import Signup from "./Pages/Home/Signup";
import TeamSelection from "./Pages/MyTeam/TeamSelection";
import MyTeam from "./Pages/MyTeam/MyTeam";
import Budget from "./Pages/MyTeam/Budget"; // Ensure correct import
// Admin Pages
import AdminLogin from "./Pages/admin/AdminLogin";
import AdminSignup from "./Pages/admin/AdminSignup";
import AdminPlayers from "./Pages/admin/Players";
import AdminPlayerStats from "./Pages/admin/PlayerStats"; // Ensure correct import
import TournamentSummary from "./Pages/admin/TournamentSummary";
// Spiriter Page (Assuming this is another part of the app)
import Spiriter from "./Pages/spiriter/Spiriter";
import Leaderboard from "./Pages/leaderboard/Leaderboard";
import NewPlayers from "./Pages/MyTeam/NewPlayers";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} /> {/* User Login Page */}
          <Route path="/signup" element={<Signup />} /> {/* User Signup Page */}
          {/* ------------------- */}
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            {/* Add other protected routes here */}
            <Route path="/dashbord" element={<Dashbord />} />
            <Route path="/NewPlayers" element={<NewPlayers/>} />
            <Route path="/TeamSelection" element={<TeamSelection />} />{" "}
            <Route path="/MyTeam" element={<MyTeam />} />{" "}
            {/* User MyTeam Page */}
            <Route path="/budget" element={<Budget />} />{" "}
            {/* User Budget Page */}
            <Route path="/leaderboard" element={<Leaderboard />} />
            {/* Spiriter Page */}
            <Route path="/spiriter" element={<Spiriter />} />{" "}
          </Route>
          {/* ------------------------ */}
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/players" element={<AdminPlayers />} />
          <Route path="/admin/player-stats" element={<AdminPlayerStats />} />
          <Route
            path="/admin/tournament-summary"
            element={<TournamentSummary />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
