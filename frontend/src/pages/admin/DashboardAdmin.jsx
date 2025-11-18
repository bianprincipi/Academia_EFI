// src/pages/admin/DashboardAdmin.jsx

import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { useAuth } from '../../context/authContextDefinition'; // Importamos el hook

export default function DashboardAdmin() {
    const { user } = useAuth(); // Obtenemos la información del usuario logueado

    return (
        <Box sx={{ p: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Bienvenido, {user?.name || 'Administrador'}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Dashboard Principal
                </Typography>
                <Box sx={{ mt: 3 }}>
                    <Typography variant="body1">
                        Tu rol actual es: **{user?.rol.toUpperCase() || 'N/A'}**
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Utiliza el menú lateral para gestionar asignaturas, usuarios y reportes.
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}