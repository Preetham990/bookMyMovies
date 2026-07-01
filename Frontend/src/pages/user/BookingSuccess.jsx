import { useLocation, useNavigate, useParams } from "react-router-dom";

function BookingSuccess() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const booking = state?.booking || {};

  const bookingId = booking?.id || id;

  return (
    <section className="container success-page">
      <h1>✅ Booking Confirmed</h1>

      <h2>
        Booking ID: <b>{bookingId}</b>
      </h2>

      <div className="panel">
        <p>Status: {booking.bookingStatus || "PENDING"}</p>

        {booking.seatNumber && (
          <p>Seats: {booking.seatNumber.join(", ")}</p>
        )}

        {booking.price && <p>Total: ₹{booking.price}</p>}
      </div>

      <button onClick={() => navigate("/my-bookings")}>
        View My Bookings
      </button>
    </section>
  );
}

export default BookingSuccess;