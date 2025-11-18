// src/pages/auth/ResetPassword.jsx

import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TextField, Button, Stack, Typography, Paper } from '@mui/material';
import { useAuth } from '../../context/authContextDefinition';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Capturamos el token de la URL

  // Obtenemos la función 'resetPassword' del contexto
  const { resetPassword } = useAuth(); 

  // Si no hay token en la URL, mostramos un error o redirigimos
  if (!token) {
    return (
      <Paper sx={{ maxWidth: 420, mx: 'auto', p: 3, textAlign: 'center' }}>
        <Typography color="error">Token de restablecimiento no encontrado.</Typography>
        <Button onClick={() => navigate('/forgot-password', { replace: true })} sx={{ mt: 2 }}>
            Volver a solicitar enlace
        </Button>
      </Paper>
    );
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      return setError('Las contraseñas no coinciden.');
    }
    if (password.length < 8) {
      return setError('La contraseña debe tener al menos 8 caracteres.');
    }

    setLoading(true);
    try {
      // Llamamos a la función 'resetPassword' con el token y la nueva contraseña
      await resetPassword(token, password);

      setSuccess('Contraseña restablecida con éxito. Serás redirigido.');
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 3000);
      
    } catch (err) {
      const msg = err.response?.data?.message || 'Token inválido o expirado. Vuelve a solicitar el enlace.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ maxWidth: 420, mx: 'auto', p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Establecer Nueva Contraseña</Typography>
      
      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 1 }}>{error}</Typography>
      )}
      {success && (
        <Typography color="success.main" variant="body2" sx={{ mb: 1 }}>{success}</Typography>
      )}
      
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Nueva Contraseña"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirmar Nueva Contraseña"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Restableciendo…' : 'Restablecer Contraseña'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}