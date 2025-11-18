// src/pages/auth/ForgotPassword.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Stack, Typography, Paper } from '@mui/material';
import { useAuth } from '../../context/authContextDefinition'; // Importamos el hook

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Obtenemos la función 'forgotPassword' del contexto
  const { forgotPassword } = useAuth(); 

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      return setError('Por favor, ingresa tu email.');
    }

    setLoading(true);
    try {
      // Llamamos a la función 'forgotPassword' del AuthContext
      await forgotPassword(email);

      // Si tiene éxito, mostramos el mensaje al usuario.
      setSuccess('Si la cuenta existe, recibirás un correo electrónico con instrucciones para restablecer tu contraseña.');
      
    } catch (err) {
      // El backend no debe revelar si el email existe o no por razones de seguridad.
      // Por lo general, se muestra un mensaje genérico.
      const msg = err.response?.data?.message || 'Error en el servidor. Intente más tarde.';
      setError(msg); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ maxWidth: 420, mx: 'auto', p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Recuperar Contraseña</Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Ingresa tu dirección de correo electrónico para recibir un enlace de restablecimiento.
      </Typography>

      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 1 }}>{error}</Typography>
      )}
      {success && (
        <Typography color="success.main" variant="body2" sx={{ mb: 1 }}>{success}</Typography>
      )}
      
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Enviando…' : 'Enviar Enlace'}
          </Button>
        </Stack>
      </form>
      
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Typography variant="body2">Volver a Iniciar Sesión</Typography>
        </Link>
      </Stack>
    </Paper>
  );
}