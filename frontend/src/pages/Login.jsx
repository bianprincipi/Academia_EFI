import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Stack, Typography, Paper } from '@mui/material';
import api from '../services/api.js';
import { useAuth } from '../auth.jsx';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', { email, password });
      login(data.token);                       // guarda token en localStorage/contexto
      nav('/portal/home', { replace: true });  // entra al portal
    } catch (err) {
      const msg = err?.response?.data?.message || 'Credenciales inválidas';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ maxWidth: 420, mx: 'auto', p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Iniciar sesión</Typography>
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
      <Typography variant="body2" sx={{ mt: 2 }}>
        Demo: admin@uni.test / Admin123! — beto@uni.test / Est123!
      </Typography>
    </Paper>
  );
}
