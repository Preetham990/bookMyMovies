import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateShows } from '../../api/showApi';

function EditShow() {
  const { id } = useParams(); const navigate = useNavigate(); const { state } = useLocation(); const s = state?.show;
  const [form, setForm] = useState({ movieId: s?.movie?.id || '', theatreId: s?.theatre?.id || '', showTime: s?.showTime?.slice(0,16) || '', price: s?.price || '' });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => { e.preventDefault(); await updateShows(id, { movieId: Number(form.movieId), theatreId: Number(form.theatreId), showTime: form.showTime, price: Number(form.price) }); alert('Show updated'); navigate('/admin/shows'); };
  return <section><h1>Edit Show</h1><form className="form-grid" onSubmit={submit}><input name="movieId" placeholder="movieId" value={form.movieId} onChange={change} required /><input name="theatreId" placeholder="theatreId" value={form.theatreId} onChange={change} required /><input name="showTime" type="datetime-local" value={form.showTime} onChange={change} required /><input name="price" placeholder="price" value={form.price} onChange={change} required /><button>Update Show</button></form></section>;
}
export default EditShow;
