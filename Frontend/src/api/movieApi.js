import api from './api';

export const getAllMovies = () =>
  api.get('/api/movies/getallmovies');

export const addMovie = (payload) =>
  api.post('/api/movies/addmovie', payload);

export const getMoviesByGenre = (genre) =>
  api.get(`/api/movies/getmoviesbygenre/${genre}`);

export const deleteMovie = (id) =>
  api.delete(`/api/movies/delete/${id}`);

export const updateMovie = (id, payload) =>
  api.put(`/api/movies/update/${id}`, payload);
