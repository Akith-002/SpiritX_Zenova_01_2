import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Home/login"; // Adjust the path as needed
import Signup from "./Pages/Home/Signup"; // Assuming you have a Signup component
import Home from "./Pages/Home/Home";  // Assuming you have a Home component

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home Page */}
          <Route path="/login" element={<Login />} /> {/* Login Page */}
          <Route path="/signup" element={<Signup />} /> {/* Signup Page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
