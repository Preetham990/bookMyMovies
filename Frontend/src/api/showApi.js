import api from './api';
export const getAllShows = () => api.get('/shows/getallshows');
export const getShowsByMovie = (id) => api.get(`/shows/getshowsbymovie/${id}`);
export const getShowsByTheatre = (id) => api.get(`/shows/getshowsbytheatre/${id}`);
export const createShows = (payload) => api.post('/shows/createshows', payload);
export const updateShows = (id, payload) => api.put(`/shows/updateshows/${id}`, payload);
export const deleteShows = (id) => api.delete(`/shows/deleteshows/${id}`);
