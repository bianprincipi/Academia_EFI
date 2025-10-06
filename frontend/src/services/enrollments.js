import api from '../api';
export const enroll = (userId, classId) => api.post('/enrollments', { userId, classId });
export const listByUser = (userId) => api.get(`/enrollments/user/${userId}`);
export const unenroll = (id) => api.delete(`/enrollments/${id}`);
