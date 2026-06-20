export default function BookingRow({ booking, onUpdateStatus, onDeleteClick }) {
  return (
    <tr>
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
            onClick={() => onUpdateStatus(booking.id, "confirmed")}
          >
            Confirm
          </button>
          <button
            className="pending-btn"
            onClick={() => onUpdateStatus(booking.id, "pending")}
          >
            Pending
          </button>
          <button className="delete-btn" onClick={() => onDeleteClick(booking)}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
