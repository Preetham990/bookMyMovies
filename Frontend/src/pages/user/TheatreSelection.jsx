import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTheatreByLocation } from '../../api/theatreApi';
import TheatreCard from '../../components/TheatreCard';

function TheatreSelection() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [theatres, setTheatres] = useState([]);
  const [error, setError] = useState('');

  const search = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await getTheatreByLocation(location);
      setTheatres(res.data || []);
    } catch { setError('Could not load theatres for this location.'); }
  };

  return (
    <section className="container">
      <h1>Select Theatre</h1>
      <form className="inline-form" onSubmit={search}>
        <input placeholder="Enter location, e.g. Bangalore" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <button>Search</button>
      </form>
      {error && <div className="error">{error}</div>}
      <div className="grid-2">
        {theatres.map((t) => <TheatreCard key={t.id} theatre={t} onSelect={() => navigate(`/movie/${movieId}/theatre/${t.id}/shows`)} />)}
      </div>
    </section>
  );
}
export default TheatreSelection;
