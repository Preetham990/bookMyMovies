import api from './api';

export const loginUser = (payload) => api.post('/api/auth/login', payload);

export const registerNormalUser = (payload) =>
  api.post('/api/auth/registernormaluser', payload);

export const registerAdminUser = (payload) =>
  api.post('/admin/registeradminuser', payload);