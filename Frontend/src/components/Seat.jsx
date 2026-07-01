function Seat({ value, selected, booked, onClick }) {
  let className = "seat";

  if (selected) {
    className += " selected";
  }

  if (booked) {
    className += " booked";
  }

  return (
    <button
      className={className}
      disabled={booked}
      onClick={() => onClick(value)}
      title={booked ? "Already booked" : "Available"}
    >
      {value}
    </button>
  );
}

export default Seat;