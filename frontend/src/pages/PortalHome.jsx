import { Typography, Stack, Button, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth.jsx';

export default function PortalHome(){
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/portal', { replace:true });
  };

  return (
    <Paper sx={{ p:3 }}>
      <Typography variant="h5" sx={{ mb:1 }}>Bienvenida/o</Typography>
      <Typography variant="body1" sx={{ mb:2 }}>
        Sesión: <b>{user?.email}</b> ({user?.role})
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button component={Link} to="/app/classes" variant="contained">Clases</Button>
        {user?.role === 'admin' && (
          <Button component={Link} to="/app/subjects" variant="outlined">Materias (admin)</Button>
        )}
        <Button component={Link} to="/app/my-enrollments" variant="outlined">Mis inscripciones</Button>
        <Button onClick={handleLogout} color="error">Salir</Button>
      </Stack>
    </Paper>
  );
}
