import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateTheatre } from '../../api/theatreApi';

function EditTheatre() {
  const { id } = useParams(); const navigate = useNavigate(); const { state } = useLocation();
  const [form, setForm] = useState(state?.theatre || { theatreName: '', theatreLocation: '', theatreCapacity: '', theatreScreenType: '' });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => { e.preventDefault(); await updateTheatre(id, { ...form, theatreCapacity: Number(form.theatreCapacity) }); alert('Theatre updated'); navigate('/admin/theatres'); };
  return <section><h1>Edit Theatre</h1><form className="form-grid" onSubmit={submit}>{['theatreName','theatreLocation','theatreCapacity','theatreScreenType'].map((f) => <input key={f} name={f} placeholder={f} value={form[f] || ''} onChange={change} required />)}<button>Update Theatre</button></form></section>;
}
export default EditTheatre;
