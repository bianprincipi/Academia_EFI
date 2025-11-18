import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

export const PrivateRoute = () => {
    const { isAuth, loading } = useAuth();

    if (loading) {
        return <div style={{padding: '50px', textAlign: 'center'}}>Cargando Autenticación...</div>; 
    }

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};