import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getShowsByMovie } from '../../api/showApi';
import Loader from '../../components/Loader';
import { formatDateTime, movieTitle, rupee } from '../../utils/format';

function ShowSelection() {
  const { movieId, theatreId } = useParams();
  const navigate = useNavigate();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getShowsByMovie(movieId).then((res) => setShows(res.data || [])).finally(() => setLoading(false));
  }, [movieId]);

  const filtered = useMemo(() => shows.filter((s) => String(s.theatre?.id) === String(theatreId)), [shows, theatreId]);

  if (loading) return <Loader />;
  return (
    <section className="container">
      <h1>Select Show</h1>
      <div className="list">
        {filtered.map((show) => (
          <div className="row" key={show.id}>
            <span>{movieTitle(show.movie)}</span>
            <span>{show.theatre?.theatreName}</span>
            <span>{formatDateTime(show.showTime)}</span>
            <span>{rupee(show.price)}</span>
            <button onClick={() => navigate(`/show/${show.id}/seats`, { state: { show } })}>Select Seats</button>
          </div>
        ))}
        {filtered.length === 0 && <p>No shows found for this theatre. Admin should create shows first.</p>}
      </div>
    </section>
  );
}
export default ShowSelection;
