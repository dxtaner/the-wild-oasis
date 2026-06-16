import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "./layout.css";

export default function AppLayout() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
