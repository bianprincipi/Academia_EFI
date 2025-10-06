import api from '../api';
export const listClasses = () => api.get('/classes');
export const createClass = (payload) => api.post('/classes', payload);
export const updateClass = (id, payload) => api.put(`/classes/${id}`, payload);
export const removeClass = (id) => api.delete(`/classes/${id}`);
