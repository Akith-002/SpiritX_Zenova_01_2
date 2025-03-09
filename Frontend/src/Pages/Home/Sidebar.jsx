import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-white shadow-lg p-4">
      <ul className="space-y-2">
        <SidebarItem to="/" text="Dashboard" />
        <SidebarItem to="/players" text="Players" />
        <SidebarItem to="/select-team" text="Select Team" />
        <SidebarItem to="/my-team" text="My Team" active />
        <SidebarItem to="/budget" text="Budget" />
        <SidebarItem to="/leaderboard" text="Leaderboard" />
        <SidebarItem to="/spiriter" text="Spiriter" />
        <SidebarItem to="/logout" text="Logout" />
      </ul>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ to, text, active }) => {
  return (
    <li>
      <Link
        to={to}
        className={`block px-3 py-2 rounded-lg ${
          active ? "bg-green-100 text-green-600 font-bold" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        {text}
      </Link>
    </li>
  );
};

export default Sidebar;
