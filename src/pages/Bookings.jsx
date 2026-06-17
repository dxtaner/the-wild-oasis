import { useState } from "react";
import { useBookings } from "../features/bookings/useBookings";
import "./bookings.css";

export default function Bookings() {
  const { data: bookings = [], isLoading } = useBookings();

  const [filter, setFilter] = useState("all");

  if (isLoading) {
    return (
      <div className="bookings-loading">
        <div className="spinner"></div>
        <p>Loading bookings...</p>
      </div>
    );
  }

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  return (
    <div className="bookings">
      {/* HEADER */}

      <div className="bookings-header">
        <div>
          <h1>📅 Bookings</h1>
          <p>Manage hotel reservations</p>
        </div>

        {/* FILTERS */}

        <div className="filters">
          <button
            className={filter === "all" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={
              filter === "confirmed" ? "filter-btn active" : "filter-btn"
            }
            onClick={() => setFilter("confirmed")}
          >
            Confirmed
          </button>

          <button
            className={
              filter === "pending" ? "filter-btn active" : "filter-btn"
            }
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

          <button
            className={
              filter === "cancelled" ? "filter-btn active" : "filter-btn"
            }
            onClick={() => setFilter("cancelled")}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* TABLE */}

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Guest</th>
              <th>Cabin</th>
              <th>Dates</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="guest">{booking.guest_name}</td>

                <td>{booking.cabin_name}</td>

                <td>
                  {booking.start_date} → {booking.end_date}
                </td>

                <td>
                  <span className={`status status-${booking.status}`}>
                    {booking.status}
                  </span>
                </td>

                <td className="price">${booking.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
