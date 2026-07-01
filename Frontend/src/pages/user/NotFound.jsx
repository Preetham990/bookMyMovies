import { Link } from 'react-router-dom';
function NotFound() { return <section className="container"><h1>404</h1><p>Page not found.</p><Link to="/movies">Go Home</Link></section>; }
export default NotFound;
