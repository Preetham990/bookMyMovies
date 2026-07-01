import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import UserLayout from "./layouts/UserLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/user/Home.jsx";
import Login from "./pages/user/Login.jsx";
import Register from "./pages/user/Register.jsx";
import Movies from "./pages/user/Movies.jsx";
import MovieDetails from "./pages/user/MovieDetails.jsx";
import TheatreSelection from "./pages/user/TheatreSelection.jsx";
import ShowSelection from "./pages/user/ShowSelection.jsx";
import SeatSelection from "./pages/user/SeatSelection.jsx";
import Checkout from "./pages/user/Checkout.jsx";
import BookingSuccess from "./pages/user/BookingSuccess.jsx";
import MyBookings from "./pages/user/MyBookings.jsx";
import Profile from "./pages/user/Profile.jsx";
import NotFound from "./pages/user/NotFound.jsx";

import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import MovieList from "./pages/admin/MovieList.jsx";
import AddMovie from "./pages/admin/AddMovie.jsx";
import EditMovie from "./pages/admin/EditMovie.jsx";
import TheatreList from "./pages/admin/TheatreList.jsx";
import AddTheatre from "./pages/admin/AddTheatre.jsx";
import EditTheatre from "./pages/admin/EditTheatre.jsx";
import ShowList from "./pages/admin/ShowList.jsx";
import AddShow from "./pages/admin/AddShow.jsx";
import EditShow from "./pages/admin/EditShow.jsx";
import BookingList from "./pages/admin/BookingList.jsx";
import BookingApproval from "./pages/admin/BookingApproval.jsx";
import UserList from "./pages/admin/UserList.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/all-movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />

          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/movie/:movieId/theatres"
            element={
              <ProtectedRoute>
                <TheatreSelection />
              </ProtectedRoute>
            }
          />

          <Route
            path="/movie/:movieId/theatre/:theatreId/shows"
            element={
              <ProtectedRoute>
                <ShowSelection />
              </ProtectedRoute>
            }
          />

          <Route
            path="/show/:showId/seats"
            element={
              <ProtectedRoute>
                <SeatSelection />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/booking-success/:bookingId"
            element={
              <ProtectedRoute>
                <BookingSuccess />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="movies" element={<MovieList />} />
          <Route path="movies/add" element={<AddMovie />} />
          <Route path="movies/edit/:id" element={<EditMovie />} />
          <Route path="theatres" element={<TheatreList />} />
          <Route path="theatres/add" element={<AddTheatre />} />
          <Route path="theatres/edit/:id" element={<EditTheatre />} />
          <Route path="shows" element={<ShowList />} />
          <Route path="shows/add" element={<AddShow />} />
          <Route path="shows/edit/:id" element={<EditShow />} />
          <Route path="bookings" element={<BookingList />} />
          <Route path="booking-approval" element={<BookingApproval />} />
          <Route path="users" element={<UserList />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;