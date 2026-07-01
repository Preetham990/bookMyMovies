import api from "./api";

export const createBooking = (payload) =>
  api.post("/booking/createbooking", payload);

export const getUserBooking = (userId) =>
  api.get(`/booking/getuserbooking/${userId}`);

export const getAllBookings = () =>
  api.get("/booking/getallbookings");

export const confirmBooking = (id) =>
  api.put(`/booking/${id}/confirm`);

export const cancelBooking = (id) =>
  api.put(`/booking/${id}/cancel`);

export const getBookedSeats = (showId) =>
  api.get(`/booking/bookedseats/${showId}`);