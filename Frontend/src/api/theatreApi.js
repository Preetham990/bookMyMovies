import api from './api';
export const getTheatreByLocation = (location) => api.get('/theatre/gettheatrebylocation', { params: { location } });
export const addTheatre = (payload) => api.post('/theatre/addtheatre', payload);
export const updateTheatre = (id, payload) => api.put(`/theatre/updatetheatre/${id}`, payload);
export const deleteTheatre = (id) => api.delete(`/theatre/deletetheatre/${id}`);
