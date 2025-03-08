import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Home/Login";
import Signup from "./Pages/Home/Signup";
import Home
 from "./Pages/Home/Home";
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
