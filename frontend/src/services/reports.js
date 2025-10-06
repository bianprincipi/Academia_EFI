import api from '../api';
export const pdfSchedule = (userId) =>
  api.get(`/reports/student-schedule/${userId}`, { responseType:'blob' });

export const pdfRoster = (classId) =>
  api.get(`/reports/class-roster/${classId}`, { responseType:'blob' });
