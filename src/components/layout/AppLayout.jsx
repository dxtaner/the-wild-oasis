import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useUser } from "../../features/auth/useUser";
import { useLogout } from "../../features/auth/useLogout";
import "./layout.css";

export default function AppLayout() {
  const { user, isLoading } = useUser();
  const { logout, isLoading: isLoggingOut } = useLogout();
  const navigate = useNavigate();

  const avatar =
    user?.user_metadata?.avatar ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";
  const fullName = user?.user_metadata?.fullName || "Guest User";

  const handleProfileClick = () => {
    navigate("/update-user");
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="layout-content">
        <header className="header">
          {!isLoading && user && (
            <div
              className="header-user"
              onClick={handleProfileClick}
              title="Profile Settings"
            >
              <img
                src={avatar}
                alt={`Avatar of ${fullName}`}
                className="header-avatar"
              />
              <span className="header-username">{fullName}</span>
            </div>
          )}

          <div className="header-actions">
            <button
              className="header-icon-btn"
              title="Profile Settings"
              onClick={handleProfileClick}
            >
              👤
            </button>
            <button
              className="header-icon-btn logout-btn"
              title="Logout"
              onClick={logout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "⌛" : "🚪"}
            </button>
          </div>
        </header>

        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
