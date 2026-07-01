import { useEffect, useState } from "react";
import { cancelBooking, getUserBooking } from "../../api/bookingApi";
import { getUserId, setUserId } from "../../utils/auth";
import { formatDateTime, movieTitle, rupee } from "../../utils/format";

function MyBookings() {
  const [userIdValue, setUserIdValue] = useState(getUserId());
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    if (!userIdValue) return;

    setUserId(userIdValue);
    setError("");

    try {
      const res = await getUserBooking(userIdValue);

      const data = res.data;

      if (Array.isArray(data)) {
        setBookings(data);
      } else if (data) {
        setBookings([data]);
      } else {
        setBookings([]);
      }
    } catch {
      setBookings([]);
      setError("Could not load bookings.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (id) => {
    if (!confirm("Cancel this booking?")) return;

    try {
      await cancelBooking(id);
      await load();
    } catch (err) {
      alert(err?.response?.data || "Cancel failed");
    }
  };

  return (
    <section className="container">
      <h1>My Bookings</h1>

      <div className="inline-form">
        <input
          placeholder="User ID"
          value={userIdValue}
          onChange={(e) => setUserIdValue(e.target.value)}
        />

        <button onClick={load}>Load</button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="list">
        {bookings.map((b) => (
          <div className="row booking-row" key={b.id}>
            <span>#{b.id}</span>
            <span>{movieTitle(b.shows?.movie)}</span>
            <span>{formatDateTime(b.shows?.showTime)}</span>
            <span>{b.seatNumber?.join(", ")}</span>
            <span>{rupee(b.price)}</span>
            <b>{b.bookingStatus}</b>

            {b.bookingStatus !== "CANCELLED" && (
              <button className="danger" onClick={() => cancel(b.id)}>
                Cancel
              </button>
            )}
          </div>
        ))}

        {bookings.length === 0 && <p>No bookings loaded.</p>}
      </div>
    </section>
  );
}

export default MyBookings;