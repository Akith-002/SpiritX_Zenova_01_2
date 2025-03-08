// Sidebar.jsx
"use client"

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu, X, MessageSquare, LayoutDashboard, Users, UserPlus, Trophy, DollarSign, LogOut } from "lucide-react";
import Players from "../../Pages/players/players"; // Import the Players component
import styles from "./Navbar.module.css";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Players", href: "/players", icon: Users },
  { title: "Select Team", href: "/select-team", icon: UserPlus },
  { title: "My Team", href: "/team", icon: Users },
  { title: "Budget", href: "/budget", icon: DollarSign },
  { title: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { title: "Spiriter", href: "/spiriter", icon: MessageSquare },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <button className={styles.menuBtn} onClick={toggleSidebar}>
        <X size={24} />
      </button>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link to={item.href} onClick={toggleSidebar} className={styles.navItem}>
                <item.icon className={styles.navIcon} />
                {item.title}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/" onClick={toggleSidebar} className={styles.logoutButton}>
              <LogOut className={styles.navIcon} />
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen && (
        <div className="bg-white p-4 shadow-lg rounded-lg w-72">
          <p className="text-black">Hello! How can I assist you?</p>
        </div>
      )}
      <button className="bg-blue-600 text-white p-3 rounded-full shadow-lg" onClick={() => setIsOpen(!isOpen)}>
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <div className="flex">
        <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
        <div className="flex-1 p-4">
          <button className={styles.menuBtn} onClick={() => setIsOpen(!isOpen)}>
            <Menu size={24} />
          </button>
          <Routes>
            <Route path="/players" element={<Players />} />
            <Route path="/select-team" element={<h1>Select Your Team</h1>} />
            <Route path="/team" element={<h1>Team View</h1>} />
            <Route path="/budget" element={<h1>Budget View</h1>} />
            <Route path="/leaderboard" element={<h1>Leaderboard</h1>} />
          </Routes>
        </div>
      </div>
      <Chatbot />
    </Router>
  );
};

export default Navbar;