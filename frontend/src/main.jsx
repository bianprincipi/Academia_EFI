// src/main.jsx (Versión Corregida)

import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx' // Ya no se necesita si App solo envolvía al Router
import './index.css';
import { Toaster } from 'react-hot-toast'; // Herramienta para notificaciones

// Importar los componentes clave de la arquitectura:
import { AppRouter } from './router/AppRouter.jsx'; 
import { AuthProvider } from './context/AuthContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. Proveer el Contexto de Autenticación a toda la aplicación */}
    <AuthProvider>
      {/* 2. El Router debe estar dentro del Provider para acceder al contexto */}
      <AppRouter />
    </AuthProvider>
    
    {/* 3. El Toaster puede ir fuera del Router/Contexto */}
    <Toaster position="top-right" />
  </React.StrictMode>,
);