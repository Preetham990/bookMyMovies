import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Seat from "../../components/Seat";
import { getUserId } from "../../utils/auth";
import { rupee } from "../../utils/format";
import { getBookedSeats } from "../../api/bookingApi";

function SeatSelection() {
  const { showId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const show = state?.show;

  const [selected, setSelected] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const capacity = show?.theatre?.theatreCapacity || 40;
  const price = show?.price || 0;

  const seats = useMemo(
    () =>
      Array.from({ length: Math.min(capacity, 80) }, (_, i) => {
        const row = String.fromCharCode(65 + Math.floor(i / 10));
        return `${row}${(i % 10) + 1}`;
      }),
    [capacity]
  );

  useEffect(() => {
    loadBookedSeats();
  }, [showId]);

  const loadBookedSeats = async () => {
    try {
      const res = await getBookedSeats(showId);
      setBookedSeats(res.data || []);
    } catch (err) {
      console.log("Could not load booked seats", err);
    }
  };

  const toggle = (seat) => {
    if (bookedSeats.includes(seat)) {
      return;
    }

    setSelected((old) =>
      old.includes(seat)
        ? old.filter((s) => s !== seat)
        : [...old, seat]
    );
  };

  const next = () => {
    if (selected.length === 0) {
      return alert("Select at least one seat");
    }

    navigate("/checkout", {
      state: {
        show,
        showId,
        seatNumber: selected,
        userId: getUserId(),
        price: price * selected.length,
      },
    });
  };

  return (
    <section className="container">
      <h1>Select Seats</h1>

      <div className="seat-legend">
        <span className="legend available"></span> Available
        <span className="legend selected"></span> Selected
        <span className="legend booked"></span> Booked
      </div>

      <div className="screen">SCREEN</div>

      <div className="seat-grid">
        {seats.map((s) => (
          <Seat
            key={s}
            value={s}
            selected={selected.includes(s)}
            booked={bookedSeats.includes(s)}
            onClick={toggle}
          />
        ))}
      </div>

      <div className="checkout-bar">
        <span>
          {selected.length} seats: {selected.join(", ") || "None"}
        </span>

        <b>Total {rupee(price * selected.length)}</b>

        <button onClick={next}>Continue</button>
      </div>
    </section>
  );
}

export default SeatSelection;