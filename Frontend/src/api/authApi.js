import api from './api';
export const loginUser = (payload) => api.post('/auth/login', payload);
export const registerNormalUser = (payload) => api.post('/auth/registernormaluser', payload);
export const registerAdminUser = (payload) => api.post('/admin/registeradminuser', payload);
