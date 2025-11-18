<<<<<<< HEAD
// frontend/src/services/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Instancia principal de axios apuntando al backend
const api = axios.create({
  baseURL: API_URL,
});

// 👉 Adjuntamos el token automáticamente en cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 👉 Manejo básico de 401 (token vencido / inválido)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/portal") {
        window.location.href = "/portal";
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Helper tipo "fetch" que usan tus páginas
 * apiFetch('/careers') -> data
 */
export async function apiFetch(path, { method = "GET", body } = {}) {
  const config = { method, url: path };

  if (body) {
    config.data = body;
  }

  const response = await api.request(config);
  return response.data;
}

export default api;

=======
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json'
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401 || error.response.status === 403) {
        console.error('Sesion expirada o no autorizada. Redirigiendo al login...');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default api;
>>>>>>> ef762fb219b2ce7dca33f27864cd64ad708eb271
