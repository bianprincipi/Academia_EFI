// src/router/AppRouter.jsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute'; // El Guard que protege rutas

// Vistas Públicas (Módulo de Autenticación)
import Login from '../pages/auth/Login'; 
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

// Vistas Privadas (Módulo Admin/Asignaturas)
import DashboardAdmin from '../pages/admin/DashboardAdmin';
import SubjectsPage from '../pages/admin/SubjectsPage';

// Importa aquí tu componente de Layout (Si lo tienes)
// import AdminLayout from '../components/layout/AdminLayout';


export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                
                {/* 1. RUTAS PÚBLICAS (Accesibles sin estar logueado) */}
                
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} /> 

                {/* Ruta por defecto que redirige a /login si no hay autenticación */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                
                {/* 2. RUTAS PRIVADAS (Protegidas por PrivateRoute/Guard) */}
                {/* Al usar <PrivateRoute /> como elemento padre, solo los usuarios autenticados acceden a sus rutas anidadas */}
                
                <Route element={<PrivateRoute />}>
                    
                    {/* Estructura básica de rutas privadas */}
                    <Route path="/dashboard" element={<DashboardAdmin />} />
                    <Route path="/asignaturas" element={<SubjectsPage />} />
                    
                    {/* Ejemplo de rutas anidadas dentro de un Layout (si lo implementas) */}
                    {/* <Route path="/admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<DashboardAdmin />} />
                        <Route path="asignaturas" element={<SubjectsPage />} />
                    </Route>
                    */}
                </Route>

                {/* 3. Catch-all para rutas no definidas */}
                <Route path="*" element={
                    <Box sx={{ p: 5, textAlign: 'center' }}>
                        <Typography variant="h4">404 | Página no encontrada</Typography>
                        <Link to="/dashboard">Volver al inicio</Link>
                    </Box>
                } />
            </Routes>
        </BrowserRouter>
    );
};