import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllMovies } from '../../api/movieApi';
import { getShowsByMovie } from '../../api/showApi';
import Loader from '../../components/Loader';
import { formatDateTime, movieTitle, rupee } from '../../utils/format';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [moviesRes, showsRes] = await Promise.all([getAllMovies(), getShowsByMovie(id)]);
        setMovie((moviesRes.data || []).find((m) => String(m.id) === String(id)) || null);
        setShows(showsRes.data || []);
      } finally { setLoading(false); }
    }
    load();
  }, [id]);

  if (loading) return <Loader />;
  if (!movie) return <div className="container"><div className="error">Movie not found.</div></div>;

  return (
    <section className="container details-grid">
      <div className="big-poster">{movieTitle(movie).slice(0, 2).toUpperCase()}</div>
      <div className="panel">
        <h1>{movieTitle(movie)}</h1>
        <p>{movie.description}</p>
        <p><b>Genre:</b> {movie.genre}</p>
        <p><b>Language:</b> {movie.language}</p>
        <p><b>Duration:</b> {movie.duration} min</p>
        <p><b>Release:</b> {movie.releaseDate}</p>
        <button onClick={() => navigate(`/movie/${id}/theatres`)}>Select Theatre</button>
      </div>
      <div className="panel wide">
        <h2>Shows for this movie</h2>
        <div className="list">
          {shows.map((show) => (
            <div className="row" key={show.id}>
              <span>{show.theatre?.theatreName || 'Theatre'}</span>
              <span>{formatDateTime(show.showTime)}</span>
              <span>{rupee(show.price)}</span>
              <button onClick={() => navigate(`/show/${show.id}/seats`, { state: { show } })}>Book</button>
            </div>
          ))}
          {shows.length === 0 && <p>No shows added by admin yet.</p>}
        </div>
      </div>
    </section>
  );
}
export default MovieDetails;
