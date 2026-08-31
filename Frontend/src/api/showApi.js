import api from './api';

export const createShows = (payload) =>
  api.post('/api/shows/createshows', payload);

export const getAllShows = () =>
  api.get('/api/shows/getallshows');

export const getShowsByMovie = (movieId) =>
  api.get(`/api/shows/getshowsbymovie/${movieId}`);

// Update show
export const updateShows = (showId, payload) =>
  api.put(`/api/shows/updateshow/${showId}`, payload);

// Delete show
export const deleteShows = (showId) =>
  api.delete(`/api/shows/deleteshow/${showId}`);
