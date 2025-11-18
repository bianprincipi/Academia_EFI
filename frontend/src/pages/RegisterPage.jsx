// src/pages/auth/Register.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Stack, Typography, Paper } from '@mui/material';
// Importamos el hook y aseguramos la ruta correcta según tu estructura
import { useAuth } from '../../context/authContextDefinition'; 

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(''); // Estado para mensaje de éxito

  const navigate = useNavigate(); 
  // Obtenemos la función 'register' del contexto
  const { register, isAuth } = useAuth(); 

  // Si ya está autenticado, redirigimos a donde corresponda
  if (isAuth) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (password !== confirmPassword) {
      return setError('Las contraseñas no coinciden.');
    }
    
    // Aquí puedes añadir más validaciones (ej. formato de email)

    setLoading(true);
    try {
      // Creamos el objeto con los datos que necesita el backend
      const userData = { name, email, password };
      
      // Llamamos a la función 'register' del AuthContext
      await register(userData); 

      // Si el registro es exitoso:
      setSuccess('¡Registro exitoso! Por favor, inicia sesión.');
      // Opcional: Redirigir al Login después de un breve momento
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
      
    } catch (err) {
      // Manejar errores de la API (ej. 409 Email ya existe)
      const msg = err.response?.data?.message || 'Error al registrar usuario. Intente de nuevo.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ maxWidth: 420, mx: 'auto', p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Crear cuenta</Typography>
      
      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 1 }}>
          {error}
        </Typography>
      )}
       {success && (
        <Typography color="primary" variant="body2" sx={{ mb: 1 }}>
          {success}
        </Typography>
      )}
      
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Nombre Completo"
            type="text"
            value={name}
            onChange={e=>setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            required
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirmar Contraseña"
            type="password"
            value={confirmPassword}
            onChange={e=>setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Registrando…' : 'Registrarse'}
          </Button>
        </Stack>
      </form>
      
      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Typography variant="body2">¿Ya tienes cuenta? Inicia sesión</Typography>
        </Link>
      </Stack>
    </Paper>
  );
}