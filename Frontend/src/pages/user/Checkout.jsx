import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking } from "../../api/bookingApi";
import { setUserId } from "../../utils/auth";
import { formatDateTime, movieTitle, rupee } from "../../utils/format";

function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [userIdValue, setUserIdValue] = useState(state?.userId || "");
  const [loading, setLoading] = useState(false);

  const show = state?.show;
  const seatNumber = state?.seatNumber || [];
  const showId = state?.showId || show?.id;

  const pay = async () => {
    if (!userIdValue) {
      return alert("Enter your user ID. It is shown after registration.");
    }

    if (!showId) {
      return alert("Show ID missing. Please select show again.");
    }

    if (seatNumber.length === 0) {
      return alert("Please select at least one seat.");
    }

    setLoading(true);

    try {
      setUserId(userIdValue);

      const payload = {
        numberOfSeat: seatNumber.length,
        seatNumber: seatNumber,
        userId: Number(userIdValue),
        showId: Number(showId),
      };

      console.log("BOOKING PAYLOAD:", payload);

      const bookingRes = await createBooking(payload);

      console.log("BOOKING RESPONSE:", bookingRes.data);

      const booking = bookingRes.data;

navigate(`/booking-success/${booking.id}`, {
  state: {
    booking: {
      id: booking.id,
      bookingStatus: booking.bookingStatus,
      bookingTime: booking.bookingTime,
      price: booking.price,
      seatNumber: booking.seatNumber,
      numberOfSeat: booking.numberOfSeat,
      shows: booking.shows,
    },
  },
});
    } catch (err) {
      console.log("BOOKING ERROR FULL:", err);
      console.log("BOOKING ERROR STATUS:", err?.response?.status);
      console.log("BOOKING ERROR DATA:", err?.response?.data);

      alert(
        typeof err?.response?.data === "string"
          ? err.response.data
          : JSON.stringify(err?.response?.data || "Booking failed")
      );
    } finally {
      setLoading(false);
    }
  };

  if (!showId || seatNumber.length === 0) {
    return (
      <section className="container">
        <div className="error">
          Missing checkout data. Please select seats again.
        </div>
      </section>
    );
  }

  return (
    <section className="container checkout">
      <h1>Checkout</h1>

      <div className="panel">
        <h2>{movieTitle(show?.movie)}</h2>

        <p>{show?.theatre?.theatreName}</p>

        <p>{formatDateTime(show?.showTime)}</p>

        <p>Seats: {seatNumber.join(", ")}</p>

        <p>Total: {rupee((show?.price || 0) * seatNumber.length)}</p>

        <label>Your User ID</label>

        <input
          value={userIdValue}
          onChange={(e) => setUserIdValue(e.target.value)}
          placeholder="Enter user id from registration"
        />

        <button onClick={pay} disabled={loading}>
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </section>
  );
}

export default Checkout;