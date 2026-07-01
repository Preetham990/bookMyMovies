import { NavLink } from 'react-router-dom';
function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/admin">Dashboard</NavLink>
      <NavLink to="/admin/movies">Movies</NavLink>
      <NavLink to="/admin/movies/add">Add Movie</NavLink>
      <NavLink to="/admin/theatres">Theatres</NavLink>
      <NavLink to="/admin/theatres/add">Add Theatre</NavLink>
      <NavLink to="/admin/shows">Shows</NavLink>
      <NavLink to="/admin/shows/add">Add Show</NavLink>
      <NavLink to="/admin/bookings">Bookings</NavLink>
      <NavLink to="/admin/booking-approval">
  Booking Approval
</NavLink>
    </aside>
  );
}
export default Sidebar;
