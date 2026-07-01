import { useEffect, useState } from "react";
import { cancelBooking, confirmBooking, getAllBookings } from "../../api/bookingApi";
import { formatDateTime, movieTitle, rupee } from "../../utils/format";

function BookingApproval() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    try {
      const res = await getAllBookings();

      if (Array.isArray(res.data)) {
        setBookings(res.data);
      } else {
        setBookings([]);
      }
    } catch (err) {
      alert("Could not load bookings");
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const approve = async (id) => {
    try {
      await confirmBooking(id);
      alert("Booking approved");
      loadBookings();
    } catch (err) {
      alert(err?.response?.data || "Approval failed");
    }
  };

  const cancel = async (id) => {
    try {
      await cancelBooking(id);
      alert("Booking cancelled");
      loadBookings();
    } catch (err) {
      alert(err?.response?.data || "Cancel failed");
    }
  };

  return (
    <section className="container">
      <h1>Booking Approval</h1>

      <div className="list">
        {bookings.map((b) => (
          <div className="row booking-row" key={b.id}>
            <span>#{b.id}</span>
            <span>{b.user?.username}</span>
            <span>{movieTitle(b.shows?.movie)}</span>
            <span>{formatDateTime(b.shows?.showTime)}</span>
            <span>{b.seatNumber?.join(", ")}</span>
            <span>{rupee(b.price)}</span>
            <b>{b.bookingStatus}</b>

            {b.bookingStatus === "PENDING" && (
              <button onClick={() => approve(b.id)}>Approve</button>
            )}

            {b.bookingStatus !== "CANCELLED" && (
              <button className="danger" onClick={() => cancel(b.id)}>
                Cancel
              </button>
            )}
          </div>
        ))}

        {bookings.length === 0 && <p>No bookings found.</p>}
      </div>
    </section>
  );
}

export default BookingApproval;