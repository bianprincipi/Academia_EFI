import api from '../api';
export const login = (email,password)=> api.post('/auth/login',{email,password});
export const forgot = (email)=> api.post('/auth/forgot-password',{email});
export const reset = (token,newPassword)=> api.post('/auth/reset-password',{token,newPassword});
