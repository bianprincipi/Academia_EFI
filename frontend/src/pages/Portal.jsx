// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../auth.jsx';
// import Login from './Login.jsx';

// export default function Portal(){
//   const { user } = useAuth();
//   const nav = useNavigate();

//   useEffect(() => {
//     if (user) nav('/portal/home', { replace: true });
//   }, [user, nav]);

//   if (!user) return <Login />;
//   return null;
// }
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth.jsx';
import Login from './Login.jsx';
import { Box, Typography, CircularProgress, Fade, Paper } from '@mui/material';

export default function Portal() {
  const { user, loading } = useAuth(); // por si tu hook maneja estado de carga
  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => nav('/portal/home', { replace: true }), 600);
      return () => clearTimeout(timer);
    }
  }, [user, nav]);

  // ⏳ Pantalla de carga breve mientras chequea sesión
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        }}
      >
        <CircularProgress size={50} />
        <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
          Verificando sesión...
        </Typography>
      </Box>
    );
  }

  // 🧑‍💻 Si no hay usuario, mostrar login centrado
  if (!user) {
    return (
      <Fade in timeout={700}>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'linear-gradient(135deg, #e3f2fd 0%, #e8eaf6 100%)',
            p: 2,
          }}
        >
          <Paper
            elevation={6}
            sx={{
              maxWidth: 400,
              width: '100%',
              borderRadius: 3,
              p: 4,
              textAlign: 'center',
              backgroundColor: 'white',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Portal Universitario
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Iniciá sesión para acceder a tu cuenta
            </Typography>
            <Login />
          </Paper>
        </Box>
      </Fade>
    );
  }

  // 🚀 Si hay usuario, lo redirige automáticamente
  return null;
}
