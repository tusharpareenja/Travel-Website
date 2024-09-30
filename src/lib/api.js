import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Intercept requests to add the Authorization header
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;