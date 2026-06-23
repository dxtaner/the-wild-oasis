import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function BookingRow({ booking, onUpdateStatus, onDeleteClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuCoords, setMenuCoords] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", () => setIsMenuOpen(false), true);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", () => setIsMenuOpen(false), true);
    };
  }, [isMenuOpen]);

  const handleTriggerClick = () => {
    if (!isMenuOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const menuHeight = 210;

      if (windowHeight - rect.bottom < menuHeight) {
        setMenuCoords({
          top: rect.top + window.scrollY - menuHeight - 6,
          left: rect.right + window.scrollX - 190,
        });
      } else {
        setMenuCoords({
          top: rect.bottom + window.scrollY + 6,
          left: rect.right + window.scrollX - 190,
        });
      }
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const statusMap = {
    confirmed: { label: "Confirmed", class: "status-confirmed" },
    pending: { label: "Pending", class: "status-pending" },
    cancelled: { label: "Cancelled", class: "status-cancelled" },
  };

  const currentStatus = statusMap[booking.status] || {
    label: booking.status,
    class: "status-pending",
  };

  return (
    <tr className="booking-row">
      <td className="cabin-cell">{booking.cabin_name}</td>

      <td>
        <div className="guest-info">
          <span className="guest-name">{booking.guest_name}</span>
          <span className="guest-email">
            {booking.guest_email ||
              `${booking.guest_name
                .toLowerCase()
                .replace(/\s+/g, "")}@gmail.com`}
          </span>
        </div>
      </td>

      <td className="dates-cell">
        <div className="dates-wrapper">
          <span className="date-main">{booking.start_date}</span>
          <span className="date-arrow">→</span>
          <span className="date-main">{booking.end_date}</span>
        </div>
      </td>

      <td>
        <span className={`status-badge ${currentStatus.class}`}>
          {currentStatus.label}
        </span>
      </td>

      <td className="price-cell">${booking.total_price}</td>

      <td className="actions-cell">
        <div className="context-menu-container">
          <button
            ref={triggerRef}
            className={`menu-trigger-btn ${isMenuOpen ? "active" : ""}`}
            onClick={handleTriggerClick}
          >
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </button>

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="dropdown-menu-fixed"
              style={{
                top: `${menuCoords.top}px`,
                left: `${menuCoords.left}px`,
              }}
            >
              <button
                className="dropdown-item"
                onClick={() => {
                  navigate(`/bookings/${booking.id}`);
                  setIsMenuOpen(false);
                }}
              >
                👁️ See Details
              </button>

              {booking.status !== "confirmed" && (
                <button
                  className="dropdown-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateStatus(booking.id, "confirmed");
                    setIsMenuOpen(false);
                  }}
                >
                  🟢 Mark as Confirmed
                </button>
              )}

              {booking.status !== "pending" && (
                <button
                  className="dropdown-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateStatus(booking.id, "pending");
                    setIsMenuOpen(false);
                  }}
                >
                  🟡 Move to Pending
                </button>
              )}

              {booking.status !== "cancelled" && (
                <button
                  className="dropdown-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateStatus(booking.id, "cancelled");
                    setIsMenuOpen(false);
                  }}
                >
                  🔴 Cancel Booking
                </button>
              )}

              <button
                className="dropdown-item delete-item"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteClick(booking);
                  setIsMenuOpen(false);
                }}
              >
                🗑️ Delete Booking
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
