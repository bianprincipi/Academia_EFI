import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Stack,
  MenuItem, 
  Paper,
  CircularProgress 
} from '@mui/material';

const ROLES = [
  { value: 'estudiante', label: 'Estudiante' },
  { value: 'profesor', label: 'Profesor' },
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    rol: 'estudiante',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/register', formData);
      
      toast.success('Registro exitoso. ¡Inicia sesión para continuar!');
      navigate('/login');
      
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al registrar usuario.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper sx={{ mt: 5, p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Crear Cuenta
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Stack spacing={2}>
              
              <TextField
                required
                fullWidth
                label="Nombre Completo"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
              
              <TextField
                required
                fullWidth
                label="Correo Electrónico"
                name="correo"
                type="email"
                value={formData.correo}
                onChange={handleChange}
              />
              
              <TextField
                required
                fullWidth
                label="Contraseña"
                name="contraseña" // Asegúrate que el nombre coincida con tu backend
                type="password"
                value={formData.contraseña}
                onChange={handleChange}
              />

              <TextField
                select
                required
                fullWidth
                label="Rol"
                name="rol"
                value={formData.rol}
                onChange={handleChange}
              >
                {ROLES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrarse'}
              </Button>
            </Stack>
          </Box>
        </Box>
        
        <Box textAlign="center" sx={{ mt: 2 }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Typography variant="body2">¿Ya tienes cuenta? Inicia Sesión</Typography>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}