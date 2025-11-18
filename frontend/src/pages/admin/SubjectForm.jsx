// src/components/admin/SubjectForm.jsx

import React, { useState, useEffect } from 'react';
import { Button, Stack, TextField, Typography, Box } from '@mui/material';

// El componente recibe las props necesarias
export default function SubjectForm({ initialData = null, onSubmit, onCancel, isSubmitting }) {
    // 1. Estado inicial del formulario
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
        // Agrega cualquier otro campo relevante aquí
    });
    
    // 2. Cargar datos iniciales si estamos en modo Edición
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                code: initialData.code || '',
                description: initialData.description || '',
                // ...otros campos
            });
        }
    }, [initialData]);

    // 3. Manejador de cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 4. Manejador de envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Llamar a la función onSubmit que recibe los datos del componente padre
        onSubmit(formData);
    };

    const isEditMode = !!initialData;

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ minWidth: 350 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
                {isEditMode ? 'Editar Asignatura' : 'Crear Nueva Asignatura'}
            </Typography>
            
            <Stack spacing={2}>
                <TextField
                    label="Nombre de la Asignatura"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Código (Ej: EFI101)"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                />

                <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'flex-end' }}>
                    <Button onClick={onCancel} variant="outlined" disabled={isSubmitting}>
                        Cancelar
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (isEditMode ? 'Guardando...' : 'Creando...') : (isEditMode ? 'Guardar Cambios' : 'Crear Asignatura')}
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}
