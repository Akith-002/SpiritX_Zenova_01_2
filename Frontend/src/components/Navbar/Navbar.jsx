"use client";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, UserPlus, Trophy, DollarSign, MessageSquare, LogOut, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Players",
    href: "/dashboard/players",
    icon: Users,
  },
  {
    title: "Select Team",
    href: "/dashboard/select-team",
    icon: UserPlus,
  },
  {
    title: "My Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Budget",
    href: "/dashboard/budget",
    icon: DollarSign,
  },
  {
    title: "Leaderboard",
    href: "/dashboard/leaderboard",
    icon: Trophy,
  },
  {
    title: "Spiriter",
    href: "/dashboard/spiriter",
    icon: MessageSquare,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
              <Link to={item.href} className={location.pathname === item.href ? "active" : ""}>
                <item.icon /> {item.title}
              </Link>
            </li>
          ))}
          <li className={styles.navItem}>
            <Link to="/logout" className={location.pathname === "/logout" ? "active" : ""}>
              <LogOut /> Log Out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

