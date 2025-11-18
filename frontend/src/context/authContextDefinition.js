// src/context/authContextDefinition.js

import { createContext, useContext } from 'react';

// 1. Definir y Exportar el Contexto
export const AuthContext = createContext(undefined); // Es mejor inicializar con undefined o un valor por defecto

// 2. Hook para usar el contexto fácilmente
export const useAuth = () => {
    const context = useContext(AuthContext);
    
    // Opcional: Error handling si el hook se usa fuera del Provider
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    
    return context;
};