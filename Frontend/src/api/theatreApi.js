import api from './api';

export const getTheatreByLocation = (location) =>
  api.get('/api/theatre/gettheatrebylocation', {
    params: { location }
  });

export const addTheatre = (payload) =>
  api.post('/api/theatre/addtheatre', payload);

export const updateTheatre = (id, payload) =>
  api.put(`/api/theatre/updatetheatre/${id}`, payload);

export const deleteTheatre = (id) =>
  api.delete(`/api/theatre/deletetheatre/${id}`);
