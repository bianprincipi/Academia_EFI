// src/services/auth.js
import axiosClient from '../api/axiosClient'; 

/**
 * Llama a la API para iniciar sesión, guarda el token y el usuario en localStorage.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} Datos de respuesta de la API (incluye token y user).
 */
export const login = async (email, password) => {
    const { data } = await axiosClient.post('/auth/login', { email, password });
    
    // Almacenar el token y la información del usuario.
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user)); 
    
    return data;
};

/**
 * Limpia el almacenamiento local para cerrar la sesión.
 */
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

/**
 * Llama a la API para solicitar restablecer la contraseña.
 * @param {string} email
 */
export const forgotPassword = (email) => 
    axiosClient.post('/auth/forgot-password', { email });

/**
 * Llama a la API para restablecer la contraseña usando el token.
 * @param {string} token - Token recibido por correo.
 * @param {string} newPassword - Nueva contraseña.
 */
export const resetPassword = (token, newPassword) => 
    axiosClient.post('/auth/reset-password', { token, newPassword });

// Opcional: Si quieres un objeto de servicio único, puedes usar esta exportación:
// export const authService = { login, logout, forgotPassword, resetPassword };