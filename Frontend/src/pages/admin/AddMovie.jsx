import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addMovie } from '../../api/movieApi';

function AddMovie() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', description: '', genre: '', duration: '', releaseDate: '', language: '' });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => { e.preventDefault(); await addMovie({ ...form, duration: Number(form.duration) }); alert('Movie added'); navigate('/admin/movies'); };
  return <section><h1>Add Movie</h1><form className="form-grid" onSubmit={submit}>{['name','description','genre','duration','releaseDate','language'].map((f) => <input key={f} name={f} type={f === 'releaseDate' ? 'date' : 'text'} placeholder={f} value={form[f]} onChange={change} required />)}<button>Add Movie</button></form></section>;
}
export default AddMovie;
