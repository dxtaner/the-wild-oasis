import { useState } from "react";
import { useBookings } from "../../features/bookings/useBookings";
import { useDeleteBooking } from "../../features/bookings/useDeleteBooking";
import { useUpdateBooking } from "../../features/bookings/useUpdateBooking";

import BookingFilters from "./BookingFilters";
import BookingRow from "./BookingRow";
import DeleteBookingModal from "./DeleteBookingModal";
import LoadingSpinner from "./LoadingSpinner";

import "./bookings.css";

export default function Bookings() {
  const { data: bookings = [], isLoading } = useBookings();
  const { mutate: deleteBooking } = useDeleteBooking();
  const { mutate: updateBooking } = useUpdateBooking();

  const [filter, setFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);

  if (isLoading) return <LoadingSpinner />;

  const handleUpdateStatus = (id, status) => {
    updateBooking({ id, status });
  };

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

        <BookingFilters currentFilter={filter} onFilterChange={setFilter} />
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Cabin</th>
              <th>Guest</th>
              <th>Dates</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <BookingRow
                key={booking.id}
                booking={booking}
                onUpdateStatus={handleUpdateStatus}
                onDeleteClick={setSelectedBooking}
              />
            ))}
          </tbody>
        </table>
      </div>

      <DeleteBookingModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onConfirm={deleteBooking}
      />
    </div>
  );
}
