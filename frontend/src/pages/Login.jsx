import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Stack, Typography, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext'; 

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 

  const navigate = useNavigate(); 
  const { login } = useAuth(); 

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) return;
    
    setLoading(true);
    try {
      const user = await login(email, password); 

      //REDIRECCIÓN BASADA EN ROL (Implementación de la lógica del proyecto)
      switch (user.rol) { 
        case 'admin':
          navigate('/dashboard', { replace: true }); // O '/admin/dashboard'
          break;
        case 'profesor':
          navigate('/dashboard', { replace: true }); // O '/profesor/dashboard'
          break;
        case 'estudiante':
          navigate('/dashboard', { replace: true }); // O '/estudiante/dashboard'
          break;
        default:
          navigate('/dashboard', { replace: true });
      }
      
    } catch (err) {
      const msg = err.response?.data?.message || 'Credenciales inválidas o error de conexión.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ maxWidth: 420, mx: 'auto', p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Iniciar sesión</Typography>
      
      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 1 }}>
          {error}
        </Typography>
      )}
      
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
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
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Ingresando…' : 'Ingresar'}
          </Button>
        </Stack>
      </form>
      
      <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        <Link to="/register" style={{ textDecoration: 'none' }}>
          <Typography variant="body2">Regístrate</Typography>
        </Link>
        <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
          <Typography variant="body2">¿Olvidaste la contraseña?</Typography>
        </Link>
      </Stack>
      
      <Typography variant="body2" sx={{ mt: 2 }}>
        Demo: admin@uni.test / Admin123! — beto@uni.test / Est123!
      </Typography>
    </Paper>
  );
}