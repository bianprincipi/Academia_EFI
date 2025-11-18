/* eslint-disable no-unused-vars */
// src/pages/admin/SubjectsPage.jsx (MODIFICADO)

import React, { useState, useEffect } from 'react';
import { 
    Typography, Box, Paper, Button, CircularProgress, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton,
    Modal // <-- Componente Modal añadido
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { subjectService } from '../../services/subjects'; 
import { useAuth } from '../../context/authContextDefinition'; 
import SubjectForm from '../../components/admin/SubjectForm'; // <-- Formulario importado

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
};

export default function SubjectsPage() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // ESTADOS DEL MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSubject, setCurrentSubject] = useState(null); // null = Crear, Objeto = Editar
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { user } = useAuth(); 

    // Función para recargar la lista de asignaturas (simplificada)
    const fetchSubjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await subjectService.listSubjects();
            setSubjects(data);
        } catch (err) {
            setError('No se pudieron cargar las asignaturas.');
        } finally {
            setLoading(false);
        }
    };
    
    // Manejadores del Modal
    const handleOpenCreate = () => {
        setCurrentSubject(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (subject) => {
        setCurrentSubject(subject);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentSubject(null);
    };

    // Manejador principal para Crear/Editar
    const handleSaveSubject = async (formData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            let result;
            if (currentSubject) {
                // Modo Edición
                result = await subjectService.updateSubject(currentSubject.id, formData);
                // Reemplazar el elemento editado en el estado local
                setSubjects(subjects.map(s => s.id === result.id ? result : s));
            } else {
                // Modo Creación
                result = await subjectService.createSubject(formData);
                // Añadir el nuevo elemento al estado local
                setSubjects([...subjects, result]);
            }
            handleCloseModal(); // Cerrar el modal después del éxito
        } catch (err) {
            console.error("Error al guardar asignatura:", err);
            setError(`Error al guardar: ${err.response?.data?.message || 'Problema de conexión'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Manejador de Eliminación (el mismo que antes)
    const handleDelete = async (subjectId) => {
        if (!window.confirm(`¿Estás seguro de que quieres eliminar la asignatura con ID ${subjectId}?`)) {
            return;
        }
        try {
            await subjectService.removeSubject(subjectId);
            setSubjects(subjects.filter(s => s.id !== subjectId));
        } catch (err) {
            setError('No se pudo eliminar la asignatura. Es posible que esté en uso.');
        }
    };

    // Carga Inicial
    useEffect(() => {
        fetchSubjects();
    }, []); 

    // --- Lógica de Renderizado de Estados (Loading, Error) ---
    // (Mantenemos la lógica de loading y error aquí)

    if (loading) { /* ... spinner ... */ return ( <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5, flexDirection: 'column' }}> <CircularProgress /> <Typography sx={{ mt: 2 }}>Cargando listado de asignaturas...</Typography> </Box> ); }
    if (error) { /* ... error ... */ return ( <Box sx={{ p: 5, textAlign: 'center' }}> <Typography color="error" variant="h6" gutterBottom>{error}</Typography> <Button onClick={fetchSubjects} variant="outlined" sx={{ mt: 2 }}> Reintentar Carga </Button> </Box> ); }

    // --- RENDERIZADO PRINCIPAL ---

    return (
        <Box sx={{ p: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5">Gestión de Asignaturas</Typography>
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />} 
                        onClick={handleOpenCreate} // <-- Llama al nuevo manejador
                    >
                        Nueva Asignatura
                    </Button>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Sesión iniciada como: {user?.name || user?.email} ({user?.rol || 'N/A'}).
                </Typography>
                
                {/* Mostrar error de guardado si existe */}
                {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

                {subjects.length === 0 ? (
                    <Typography variant="body1">No hay asignaturas registradas.</Typography>
                ) : (
                    <TableContainer component={Paper} elevation={1}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow sx={{ bgcolor: 'grey.100' }}>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Código</TableCell>
                                    <TableCell align="center">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {subjects.map((subject) => (
                                    <TableRow key={subject.id} hover>
                                        <TableCell>{subject.id}</TableCell>
                                        <TableCell>{subject.name}</TableCell>
                                        <TableCell>{subject.code || 'N/A'}</TableCell>
                                        <TableCell align="center">
                                            <IconButton 
                                                color="primary" 
                                                size="small"
                                                onClick={() => handleOpenEdit(subject)} // <-- Abre modal para edición
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton 
                                                color="error" 
                                                size="small"
                                                onClick={() => handleDelete(subject.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
            
            {/* Modal para Crear/Editar */}
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box sx={modalStyle}>
                    <SubjectForm
                        initialData={currentSubject} // Pasa el objeto para editar o null para crear
                        onSubmit={handleSaveSubject}
                        onCancel={handleCloseModal}
                        isSubmitting={isSubmitting}
                    />
                </Box>
            </Modal>
        </Box>
    );
}