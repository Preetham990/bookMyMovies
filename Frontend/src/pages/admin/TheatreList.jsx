import { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteTheatre, getTheatreByLocation } from '../../api/theatreApi';

function TheatreList() {
  const [location, setLocation] = useState(''); const [theatres, setTheatres] = useState([]);
  const load = async () => { const res = await getTheatreByLocation(location); setTheatres(res.data || []); };
  const remove = async (id) => { if (!confirm('Delete theatre?')) return; await deleteTheatre(id); load(); };
  return <section><div className="section-head"><h1>Theatres</h1><Link className="button-link" to="/admin/theatres/add">Add Theatre</Link></div><div className="inline-form"><input placeholder="Search location" value={location} onChange={(e) => setLocation(e.target.value)} /><button onClick={load}>Search</button></div><div className="list">{theatres.map((t) => <div className="row" key={t.id}><span>{t.theatreName}</span><span>{t.theatreLocation}</span><span>{t.theatreCapacity}</span><Link to={`/admin/theatres/edit/${t.id}`} state={{ theatre: t }}>Edit</Link><button className="danger" onClick={() => remove(t.id)}>Delete</button></div>)}</div></section>;
}
export default TheatreList;
