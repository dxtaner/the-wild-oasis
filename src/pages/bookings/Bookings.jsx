import { useState } from "react";
import { useBookings } from "../../features/bookings/useBookings";
import { useDeleteBooking } from "../../features/bookings/useDeleteBooking";
import { useUpdateBooking } from "../../features/bookings/useUpdateBooking";

import BookingFilters from "./BookingFilters";
import BookingSort from "./BookingSort";
import BookingRow from "./BookingRow";
import DeleteBookingModal from "./DeleteBookingModal";
import LoadingSpinner from "./LoadingSpinner";

import "./bookings.css";

export default function Bookings() {
  const { data: bookings = [], isLoading } = useBookings();
  const { mutate: deleteBooking } = useDeleteBooking();
  const { mutate: updateBooking } = useUpdateBooking();

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [selectedBooking, setSelectedBooking] = useState(null);

  if (isLoading) return <LoadingSpinner />;

  const handleUpdateStatus = (id, status) => {
    updateBooking({ id, status });
  };

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.start_date) - new Date(a.start_date);
      case "date-asc":
        return new Date(a.start_date) - new Date(b.start_date);
      case "amount-desc":
        return (b.total_price || 0) - (a.total_price || 0);
      case "amount-asc":
        return (a.total_price || 0) - (b.total_price || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="bookings">
      <div className="bookings-top">
        <div>
          <h1>📅 Bookings</h1>
          <p>Manage reservations and guests</p>
        </div>

        {/* Filtreleme ve Sıralama Alanı yan yana */}
        <div className="controls-wrapper">
          <BookingFilters currentFilter={filter} onFilterChange={setFilter} />
          <BookingSort currentSort={sortBy} onSortChange={setSortBy} />
        </div>
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
            {sortedBookings.map((booking) => (
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
