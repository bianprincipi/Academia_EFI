import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth.jsx';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Sistema Académico
          </Typography>
          <Button component={Link} to="/" color="inherit">Inicio</Button>
          <Button component={Link} to="/app/classes" color="inherit">Clases</Button>
          {user?.role === 'admin' && (
            <Button component={Link} to="/app/subjects" color="inherit">Materias</Button>
          )}
          {user && (
            <Button component={Link} to="/app/my-enrollments" color="inherit">Mis inscripciones</Button>
          )}
          {!user && <Button component={Link} to="/app/login" color="inherit">Login</Button>}
          {!user && <Button component={Link} to="/forgot-password" color="inherit">Olvidé mi contraseña</Button>}
          {user && <Button onClick={logout} color="inherit">Salir</Button>}
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ pt: 3, pb: 6 }}>
        {children}
        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 4, display: 'block' }}>
          {user ? `Sesión: ${user.email} (${user.role})` : 'No autenticado'}
        </Typography>
      </Container>
    </Box>
  );
}
