import axios from 'axios';
import { getToken, logout } from '../utils/auth';

const api = axios.create({
  baseURL:  'https://bookmymovies-4-dspm.onrender.com',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) logout();
    return Promise.reject(error);
  }
);

export default api;
