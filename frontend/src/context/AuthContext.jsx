// src/context/AuthContext.jsx (Archivo principal del Contexto/Provider)

import { useState, useEffect } from 'react';
// IMPORTANTE: Importar las funciones individuales que creaste en el servicio
import { 
    login as authLogin, // Renombramos 'login' para evitar conflicto con la función del Provider
    logout as authLogout, 
    register as authRegister, 
    forgotPassword as authForgotPassword 
} from '../services/auth'; 

// Importa las definiciones desde el nuevo archivo:
import { AuthContext } from './authContextDefinition'; 
// El hook 'useAuth' no se usa dentro del Provider, por eso no lo importamos aquí.

export const AuthProvider = ({ children }) => { 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Lógica para cargar el usuario al iniciar la aplicación
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            // Se asume que el token también es válido, sino el interceptor lo limpiará en la primera petición.
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // 2. Función de Login del Contexto
    const login = async (credentials) => {
        // Llama a la función del servicio y espera la respuesta
        const { user: userData } = await authLogin(credentials.email, credentials.password);
        setUser(userData);
    };

    // 3. Función de Logout del Contexto
    const logout = () => {
        authLogout(); // Llama al servicio para limpiar localStorage
        setUser(null);
    };
    
    // Objeto de valores que se provee a la aplicación
    const contextValue = {
        user,
        isAuth: !!user, // Booleano que indica si el usuario está logueado
        loading,
        login,
        logout,
        register: authRegister,
        forgotPassword: authForgotPassword,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};