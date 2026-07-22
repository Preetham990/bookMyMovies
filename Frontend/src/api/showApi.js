import api from './api';

export const createShow = (payload) =>
  api.post('/api/shows/createshows', payload);

export const getAllShows = () =>
  api.get('/api/shows/getallshows');

export const getShowsByMovie = (movieId) =>
  api.get(`/api/shows/getshowsbymovie/${movieId}`);