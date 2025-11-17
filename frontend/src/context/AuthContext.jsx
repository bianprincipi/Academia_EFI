// frontend/src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as loginService, forgot, reset } from '../services/auth'; 
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Contiene { id, nombre, rol, ... }
  const [token, setToken] = useState(null);
  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decodedUser = jwtDecode(storedToken);
        setToken(storedToken);
        setUser(decodedUser);
      } catch {
        logout(); 
      }
    }
  }, []);
  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    window.location.href = '/login'; 
  };

  const login = async (email, password) => {
    const response = await loginService(email, password);
    const newToken = response.token; 
    
    localStorage.setItem('token', newToken);
    
    const decodedUser = jwtDecode(newToken);
    setToken(newToken);
    setUser(decodedUser); 

    return decodedUser;
  };

  const checkRole = (allowedRoles) => {
    if (!user || !user.rol) return false;
    return allowedRoles.includes(user.rol);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, checkRole, forgot, reset }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);