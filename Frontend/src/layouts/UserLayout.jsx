import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function UserLayout() {
  return (
    <>
      <Navbar />
      <main className="page"><Outlet /></main>
      <Footer />
    </>
  );
}
export default UserLayout;
