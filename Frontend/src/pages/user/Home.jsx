import { useEffect, useMemo, useState } from 'react';
import { getAllMovies } from '../../api/movieApi';
import Banner from '../../components/Banner';
import SearchBar from '../../components/SearchBar';
import MovieCard from '../../components/MovieCard';
import Loader from '../../components/Loader';
import { movieTitle } from '../../utils/format';

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllMovies().then((res) => setMovies(res.data || []))
      .catch(() => setError('Could not load movies. Make sure backend is running and you are logged in.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => movies.filter((m) => movieTitle(m).toLowerCase().includes(search.toLowerCase())), [movies, search]);

  return (
    <>
      <Banner />
      <section className="container">
        <div className="section-head"><h2>Recommended Movies</h2><span>{filtered.length} found</span></div>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by movie name" />
        {loading && <Loader text="Loading movies from backend..." />}
        {error && <div className="error">{error}</div>}
        {!loading && <div className="movie-grid">{filtered.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div>}
      </section>
    </>
  );
}
export default Home;
