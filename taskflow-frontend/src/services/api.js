import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Attache automatiquement le token JWT à chaque requête si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('taskflow_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Si le token est invalide/expiré, on déconnecte proprement l'utilisateur
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('taskflow_token');
      if (window.location.pathname !== '/connexion') {
        window.location.href = '/connexion';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
