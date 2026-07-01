function TheatreCard({ theatre, onSelect }) {
  return (
    <article className="panel item-card">
      <h3>{theatre.theatreName}</h3>
      <p>{theatre.theatreLocation}</p>
      <p>Capacity: {theatre.theatreCapacity} • {theatre.theatreScreenType}</p>
      <button onClick={() => onSelect(theatre)}>Select Theatre</button>
    </article>
  );
}
export default TheatreCard;
