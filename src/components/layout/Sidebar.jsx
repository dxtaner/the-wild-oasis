import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">🏝️ Wild Oasis</h2>

      <nav className="nav">
        <NavLink to="/dashboard" className="link">
          Home
        </NavLink>

        <NavLink to="/cabins" className="link">
          Cabins
        </NavLink>

        <NavLink to="/bookings" className="link">
          Bookings
        </NavLink>

        <NavLink to="/users" className="link">
          Users
        </NavLink>

        <NavLink to="/settings" className="link">
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
