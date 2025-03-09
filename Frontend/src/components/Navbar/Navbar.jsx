"use client";

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Trophy,
  DollarSign,
  MessageSquare,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import styles from "./Navbar.module.css";

const navItems = [
  {
    title: "Dashboard",
    href: "/Dashbord",
    icon: LayoutDashboard,
  },
  {
    title: "Players",
    href: "/players",
    icon: Users,
  },
  {
    title: "Select Team",
    href: "/TeamSelection",
    icon: UserPlus,
  },


  {
    title: "My Team",
    href: "/MyTeam",
    icon: User,
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "Spiriter",
    href: "/spiriter",
    icon: MessageSquare,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    // Perform any logout logic here (e.g., clearing tokens)
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div>
        {/* <button onClick={toggleMenu} className={styles.menuButton}>
          {isOpen ? <X /> : <Menu />}
        </button> */}
      </div>
      <div>
        <ul className={styles.navItems}>
          {navItems.map((item) => (
            <li key={item.href} className={styles.navItem}>
              <Link
                to={item.href}
                className={location.pathname === item.href ? "active" : ""}
              >
                <item.icon /> {item.title}
              </Link>
            </li>
          ))}
          <li className={styles.navItem}>
            <Link
              to="/login"
              className={location.pathname === "/logout" ? "active" : ""}
              onClick={handleLogoutClick}
            >
              <LogOut /> Log Out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
