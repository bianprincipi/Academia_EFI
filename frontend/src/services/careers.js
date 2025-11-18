// src/services/careers.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function getCareers() {
  const res = await fetch(`${API_URL}/careers`);
  if (!res.ok) {
    throw new Error('Error al obtener carreras');
  }
  return res.json();
}
