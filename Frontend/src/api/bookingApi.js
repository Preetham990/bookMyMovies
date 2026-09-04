import api from "./api";

export const createBooking = (payload) =>
  api.post("/api/booking/createbooking", payload);

export const getUserBooking = (userId) =>
  api.get(`/api/booking/getuserbooking/${userId}`);

export const getAllBookings = () =>
  api.get("/api/booking/getallbookings");

export const confirmBooking = (id) =>
  api.put(`/api/booking/${id}/confirm`);

export const cancelBooking = (id) =>
  api.put(`/api/booking/${id}/cancel`);

export const getBookedSeats = (showId) =>
  api.get(`/api/booking/bookedseats/${showId}`);
