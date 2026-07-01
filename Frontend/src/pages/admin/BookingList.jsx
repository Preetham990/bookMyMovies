import { useState } from 'react';
import { getAllBookings } from "../../api/bookingApi";
import { formatDateTime, movieTitle, rupee } from '../../utils/format';

function BookingList() {
  const [showId, setShowId] = useState(''); const [bookings, setBookings] = useState([]);
  const load = async () => { const res = await getAllBookings(showId); setBookings(res.data || []); };
  return <section><h1>Bookings By Show</h1><div className="inline-form"><input placeholder="Show ID" value={showId} onChange={(e) => setShowId(e.target.value)} /><button onClick={load}>Load</button></div><div className="list">{bookings.map((b) => <div className="row" key={b.id}><span>#{b.id}</span><span>{movieTitle(b.shows?.movie)}</span><span>{b.user?.username}</span><span>{formatDateTime(b.bookingTime)}</span><span>{b.seatNumber?.join(', ')}</span><span>{rupee(b.price)}</span><b>{b.bookingStatus}</b></div>)}</div></section>;
}
export default BookingList;
