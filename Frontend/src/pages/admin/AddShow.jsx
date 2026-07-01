import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createShows } from '../../api/showApi';

function AddShow() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ movieId: '', theatreId: '', showTime: '', price: '' });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => { e.preventDefault(); await createShows({ movieId: Number(form.movieId), theatreId: Number(form.theatreId), showTime: form.showTime, price: Number(form.price) }); alert('Show added'); navigate('/admin/shows'); };
  return <section><h1>Add Show</h1><p className="small">Use Movie ID and Theatre ID from your database/admin lists.</p><form className="form-grid" onSubmit={submit}><input name="movieId" placeholder="movieId" value={form.movieId} onChange={change} required /><input name="theatreId" placeholder="theatreId" value={form.theatreId} onChange={change} required /><input name="showTime" type="datetime-local" value={form.showTime} onChange={change} required /><input name="price" placeholder="price" value={form.price} onChange={change} required /><button>Add Show</button></form></section>;
}
export default AddShow;
