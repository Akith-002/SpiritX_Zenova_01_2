import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Home/Login";
import Signup from "./Pages/Home/Signup";
import Home from "./Pages/Home/Home";
import Dashbord from "./Pages/Dashbord/Dashbord"; // Corrected spelling
import Players from "./Pages/players/players"; // Correctly import the Players component

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home Page */}
          <Route path="/login" element={<Login />} /> {/* Login Page */}
          <Route path="/signup" element={<Signup />} /> {/* Signup Page */}
          <Route path="/dashbord" element={<Dashbord />} /> {/* Dashboard Page */}
          <Route path="/players" element={<Players />} /> {/* Players Page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
