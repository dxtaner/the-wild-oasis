export default function DeleteBookingModal({ booking, onClose, onConfirm }) {
  if (!booking) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Delete Booking</h2>
        <p>
          Are you sure you want to delete booking for{" "}
          <strong>{booking.guest_name}</strong>?
        </p>
        <div className="modal-actions">
          <button className="cancel-modal-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="confirm-delete-btn"
            onClick={() => {
              onConfirm(booking.id);
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
