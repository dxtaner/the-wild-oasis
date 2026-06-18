import { useState } from "react";

import { useBookings } from "../features/bookings/useBookings";

import { useDeleteBooking } from "../features/bookings/useDeleteBooking";

import { useUpdateBooking } from "../features/bookings/useUpdateBooking";

import "./bookings.css";

export default function Bookings() {
  const { data: bookings = [], isLoading } = useBookings();

  const { mutate: deleteBooking } = useDeleteBooking();

  const { mutate: updateBooking } = useUpdateBooking();

  const [filter, setFilter] = useState("all");

  const [selectedBooking, setSelectedBooking] = useState(null);

  if (isLoading) {
    return (
      <div className="bookings-loading">
        {" "}
        <div className="spinner"></div> <p>Loading bookings...</p>{" "}
      </div>
    );
  }

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  return (
    <div className="bookings">
      <div className="bookings-top">
        <div>
          <h1>📅 Bookings</h1>
          <p>Manage reservations and guests</p>
        </div>

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
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Guest</th>
              <th>Cabin</th>
              <th>Dates</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="guest-name">{booking.guest_name}</td>

                <td>{booking.cabin_name}</td>

                <td className="dates">
                  {booking.start_date}

                  <span>→</span>

                  {booking.end_date}
                </td>

                <td>
                  <span className={`status status-${booking.status}`}>
                    {booking.status}
                  </span>
                </td>

                <td className="price">${booking.total_price}</td>

                <td>
                  <div className="actions">
                    <button
                      className="confirm-btn"
                      onClick={() =>
                        updateBooking({
                          id: booking.id,
                          status: "confirmed",
                        })
                      }
                    >
                      Confirm
                    </button>

                    <button
                      className="pending-btn"
                      onClick={() =>
                        updateBooking({
                          id: booking.id,
                          status: "pending",
                        })
                      }
                    >
                      Pending
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedBooking && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Delete Booking</h2>

            <p>
              Are you sure you want to delete booking for{" "}
              <strong>{selectedBooking.guest_name}</strong>?
            </p>

            <div className="modal-actions">
              <button
                className="cancel-modal-btn"
                onClick={() => setSelectedBooking(null)}
              >
                Cancel
              </button>

              <button
                className="confirm-delete-btn"
                onClick={() => {
                  deleteBooking(selectedBooking.id);

                  setSelectedBooking(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
