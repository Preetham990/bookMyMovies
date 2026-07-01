import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteMovie, getAllMovies } from '../../api/movieApi';
import { movieTitle } from '../../utils/format';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const load = async () => { const res = await getAllMovies(); setMovies(res.data || []); };
  useEffect(() => { load(); }, []);
  const remove = async (id) => { if (!confirm('Delete movie?')) return; await deleteMovie(id); load(); };
  return <section><div className="section-head"><h1>Movies</h1><Link className="button-link" to="/admin/movies/add">Add Movie</Link></div><div className="list">{movies.map((m) => <div className="row" key={m.id}><span>{movieTitle(m)}</span><span>{m.genre}</span><span>{m.language}</span><Link to={`/admin/movies/edit/${m.id}`}>Edit</Link><button className="danger" onClick={() => remove(m.id)}>Delete</button></div>)}</div></section>;
}
export default MovieList;
