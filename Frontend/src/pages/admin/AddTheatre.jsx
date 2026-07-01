import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTheatre } from '../../api/theatreApi';

function AddTheatre() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ theatreName: '', theatreLocation: '', theatreCapacity: '', theatreScreenType: '' });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => { e.preventDefault(); await addTheatre({ ...form, theatreCapacity: Number(form.theatreCapacity) }); alert('Theatre added'); navigate('/admin/theatres'); };
  return <section><h1>Add Theatre</h1><form className="form-grid" onSubmit={submit}>{['theatreName','theatreLocation','theatreCapacity','theatreScreenType'].map((f) => <input key={f} name={f} placeholder={f} value={form[f]} onChange={change} required />)}<button>Add Theatre</button></form></section>;
}
export default AddTheatre;
