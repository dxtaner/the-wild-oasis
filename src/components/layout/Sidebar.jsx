import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span>🏝️</span>
        <span>Wild Oasis</span>
      </div>

      <nav className="nav">
        <NavLink to="/dashboard" className="link">
          <span>🏠</span> Home
        </NavLink>

        <NavLink to="/cabins" className="link">
          <span>⛺</span> Cabins
        </NavLink>

        <NavLink to="/bookings" className="link">
          <span>📅</span> Bookings
        </NavLink>

        <NavLink to="/users" className="link">
          <span>👤</span> Users
        </NavLink>

        <NavLink to="/settings" className="link">
          <span>⚙️</span> Settings
        </NavLink>
      </nav>
    </aside>
  );
}
