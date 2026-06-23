import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBookings } from "../../features/bookings/useBookings";
import { useUpdateBooking } from "../../features/bookings/useUpdateBooking";
import LoadingSpinner from "./LoadingSpinner";
import "./bookingDetail.css";

export default function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bookings = [], isLoading } = useBookings();
  const { mutate: updateBooking } = useUpdateBooking();

  const [showConfirmCheckin, setShowConfirmCheckin] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const booking = bookings.find((b) => String(b.id) === String(id));

  useEffect(() => {
    if (booking) {
      setShowConfirmCheckin(false);
      setAddBreakfast(false);
    }
  }, [booking?.status, id]);

  if (isLoading) return <LoadingSpinner />;

  if (!booking) {
    return (
      <div className="bookings-error-container">
        <div className="error-card">
          <h2>Booking not found!</h2>
          <p>
            The reservation you are looking for might have been deleted or
            moved.
          </p>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/bookings")}
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  const currentTotalPrice = booking.total_price || 0;
  const breakfastFee = 450;

  const isAlreadyBreakfastAdded =
    booking.status === "confirmed" || booking.has_breakfast;
  const basePrice = isAlreadyBreakfastAdded
    ? currentTotalPrice - breakfastFee
    : currentTotalPrice;

  const finalPrice =
    booking.status === "pending" && showConfirmCheckin && addBreakfast
      ? basePrice + breakfastFee
      : currentTotalPrice;

  const handleUpdateStatus = (bookingId, status, finalTotal) => {
    updateBooking({ id: bookingId, status, total_price: finalTotal });
  };

  const handleConfirmProcess = () => {
    if (booking.status === "pending") {
      if (showConfirmCheckin) {
        const calculatedTotal = addBreakfast
          ? basePrice + breakfastFee
          : basePrice;
        handleUpdateStatus(booking.id, "confirmed", calculatedTotal);
      } else {
        setShowConfirmCheckin(true);
      }
    } else {
      handleUpdateStatus(booking.id, "confirmed", currentTotalPrice);
    }
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
    <div className="bookings-detail-container">
      <div className="bookings-header-navigation">
        <button className="btn-back-nav" onClick={() => navigate("/bookings")}>
          <span className="arrow">←</span> Back to Bookings
        </button>
        <div className="title-section-wrapper">
          <h1>
            Booking <span className="highlight-id">#{booking.id}</span>
          </h1>
          <span className={`status-pill ${currentStatus.class}`}>
            {currentStatus.label}
          </span>
        </div>
      </div>

      <div className="modern-detail-grid">
        <div className="details-main-content">
          <div className="modern-glass-card">
            <div className="card-header-iconic">
              <span className="icon">👤</span>
              <h3>Guest Details</h3>
            </div>
            <div className="card-body-fields">
              <div className="field-group">
                <span className="field-label">Full Name</span>
                <span className="field-value text-important">
                  {booking.guest_name}
                </span>
              </div>
              <div className="field-group">
                <span className="field-label">Email Address</span>
                <span className="field-value">
                  {booking.guest_email ||
                    `${booking.guest_name.toLowerCase().replace(/\s+/g, "")}@gmail.com`}
                </span>
              </div>
            </div>
          </div>

          <div className="modern-glass-card">
            <div className="card-header-iconic">
              <span className="icon">🏠</span>
              <h3>Accommodation</h3>
            </div>
            <div className="card-body-fields">
              <div className="field-group">
                <span className="field-label">Selected Cabin</span>
                <span className="field-value text-important">
                  {booking.cabin_name}
                </span>
              </div>
              <div className="field-group">
                <span className="field-label">Stay Duration</span>
                <span className="field-value datetime-range">
                  {booking.start_date} <span className="arrow-split">→</span>{" "}
                  {booking.end_date}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="details-sidebar-content">
          <div className="modern-glass-card finance-card highlight-border">
            <div className="card-header-iconic">
              <span className="icon">📊</span>
              <h3>Financial Summary</h3>
            </div>

            <div className="price-summary-display">
              <span className="price-title">Total Amount</span>
              <span className="price-amount">
                $
                {finalPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            {booking.status === "pending" && showConfirmCheckin && (
              <div className="modern-checkbox-addon-section">
                <div className="animated-checkbox-wrapper">
                  <label className="checkbox-container-custom">
                    <input
                      type="checkbox"
                      checked={addBreakfast}
                      onChange={(e) => setAddBreakfast(e.target.checked)}
                    />
                    <span className="checkmark-box"></span>
                    <div className="checkbox-label-text">
                      <span className="main-label">
                        Add Delicious Breakfast addon
                      </span>
                      <span className="sub-label">
                        +${breakfastFee.toFixed(2)} per guest
                      </span>
                    </div>
                  </label>
                </div>

                <div className="animated-checkbox-wrapper statement-box">
                  <label className="checkbox-container-custom">
                    <input
                      type="checkbox"
                      id="payment-confirm"
                      required
                      defaultChecked={true}
                    />
                    <span className="checkmark-box"></span>
                    <div className="checkbox-label-text">
                      <span className="statement-confirmation">
                        I confirm that <strong>{booking.guest_name}</strong> has
                        settled the full payment of{" "}
                        <span className="neon-price">
                          $
                          {finalPrice.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                        {addBreakfast && ` ($${basePrice} + $${breakfastFee})`}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            <div className="action-buttons-footer">
              {booking.status !== "confirmed" && (
                <button
                  className="btn btn-action-confirm"
                  onClick={handleConfirmProcess}
                >
                  {booking.status === "pending" && showConfirmCheckin
                    ? "Complete Process ✔"
                    : "Confirm Check-In 🟢"}
                </button>
              )}

              {booking.status !== "pending" && (
                <button
                  className="btn btn-action-pending"
                  onClick={() =>
                    handleUpdateStatus(booking.id, "pending", basePrice)
                  }
                >
                  Move back to Pending 🟡
                </button>
              )}

              {booking.status !== "cancelled" && (
                <button
                  className="btn btn-action-cancel"
                  onClick={() =>
                    handleUpdateStatus(booking.id, "cancelled", basePrice)
                  }
                >
                  Cancel Entire Booking 🔴
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
