import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <section className="container">
      <h1>Admin Dashboard</h1>

      <div className="admin-grid">
        <Link to="/admin/movies" className="admin-card">
          Movies
        </Link>

        <Link to="/admin/theatres" className="admin-card">
          Theatres
        </Link>

        <Link to="/admin/shows" className="admin-card">
          Shows
        </Link>

        <Link to="/admin/bookings" className="admin-card">
          Bookings
        </Link>

        <Link to="/admin/booking-approval" className="admin-card">
          Booking Approval
        </Link>

        <Link to="/admin/users" className="admin-card">
          Users
        </Link>
      </div>
    </section>
  );
}

export default Dashboard;