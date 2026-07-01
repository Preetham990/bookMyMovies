import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteShows, getAllShows } from '../../api/showApi';
import { formatDateTime, movieTitle, rupee } from '../../utils/format';

function ShowList() {
  const [shows, setShows] = useState([]);
  const load = async () => { const res = await getAllShows(); setShows(res.data || []); };
  useEffect(() => { load(); }, []);
  const remove = async (id) => { if (!confirm('Delete show?')) return; await deleteShows(id); load(); };
  return <section><div className="section-head"><h1>Shows</h1><Link className="button-link" to="/admin/shows/add">Add Show</Link></div><div className="list">{shows.map((s) => <div className="row" key={s.id}><span>{movieTitle(s.movie)}</span><span>{s.theatre?.theatreName}</span><span>{formatDateTime(s.showTime)}</span><span>{rupee(s.price)}</span><Link to={`/admin/shows/edit/${s.id}`} state={{ show: s }}>Edit</Link><button className="danger" onClick={() => remove(s.id)}>Delete</button></div>)}</div></section>;
}
export default ShowList;
