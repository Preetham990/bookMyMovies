import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllMovies, updateMovie } from '../../api/movieApi';

function EditMovie() {
  const { id } = useParams(); const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', description: '', genre: '', duration: '', releaseDate: '', language: '' });
  useEffect(() => { getAllMovies().then((res) => { const m = (res.data || []).find((x) => String(x.id) === String(id)); if (m) setForm({ name: m.name || '', description: m.description || '', genre: m.genre || '', duration: m.duration || '', releaseDate: m.releaseDate || '', language: m.language || '' }); }); }, [id]);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => { e.preventDefault(); await updateMovie(id, { ...form, duration: Number(form.duration) }); alert('Movie updated'); navigate('/admin/movies'); };
  return <section><h1>Edit Movie</h1><form className="form-grid" onSubmit={submit}>{['name','description','genre','duration','releaseDate','language'].map((f) => <input key={f} name={f} type={f === 'releaseDate' ? 'date' : 'text'} placeholder={f} value={form[f]} onChange={change} required />)}<button>Update Movie</button></form></section>;
}
export default EditMovie;
