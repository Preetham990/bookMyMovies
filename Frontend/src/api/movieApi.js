import api from './api';
export const getAllMovies = () => api.get('/movies/getallmovies');
export const getMoviesByGenre = (genre) => api.get('/movies/getmovicesbygenre', { params: { genre } });
export const getMoviesByLanguage = (language) => api.get('/movies/getmovicesbylanguage', { params: { language } });
export const getMovieByTitle = (title) => api.get('/movies/getmovicesbytitle', { params: { title } });
export const addMovie = (payload) => api.post('/movies/addmovie', payload);
export const updateMovie = (id, payload) => api.put(`/movies/updatemovie/${id}`, payload);
export const deleteMovie = (id) => api.delete(`/movies/deletemovie/${id}`);
