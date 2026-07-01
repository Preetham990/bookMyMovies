import { Link, NavLink, useNavigate } from "react-router-dom";
import { getUsername, isLoggedIn, logout, isAdmin } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <Link to="/movies" className="brand">🎬 BookMyMovies</Link>

      <nav>
        {loggedIn && <NavLink to="/movies">Movies</NavLink>}
        {loggedIn && <NavLink to="/my-bookings">My Bookings</NavLink>}
        {loggedIn && <NavLink to="/profile">Profile</NavLink>}

        {loggedIn && isAdmin() && (
          <NavLink to="/admin">Admin</NavLink>
        )}

        {!loggedIn && <NavLink to="/login">Login</NavLink>}
        {!loggedIn && <NavLink to="/register">Register</NavLink>}

        {loggedIn && <span className="welcome">Hi, {getUsername()}</span>}
        {loggedIn && (
          <button className="link-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default Navbar;