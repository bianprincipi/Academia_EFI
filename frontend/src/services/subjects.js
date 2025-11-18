import api from './api';
export const listSubjects = () => api.get('/subjects');
export const createSubject = (payload) => api.post('/subjects', payload);
export const updateSubject = (id, payload) => api.put(`/subjects/${id}`, payload);
export const removeSubject = (id) => api.delete(`/subjects/${id}`);
