import { useNavigate } from 'react-router-dom';
import { movieTitle } from '../utils/format';

function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <article className="movie-card">
      <div className="poster"><span>{movieTitle(movie).slice(0, 2).toUpperCase()}</span></div>
      <div className="card-body">
        <h3>{movieTitle(movie)}</h3>
        <p>{movie.genre || 'Genre'} • {movie.language || 'Language'}</p>
        <p>{movie.duration ? `${movie.duration} min` : 'Duration N/A'}</p>
        <button onClick={() => navigate(`/movie/${movie.id}`)}>Book Now</button>
      </div>
    </article>
  );
}
export default MovieCard;
