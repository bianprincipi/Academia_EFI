import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

export default function Hero(){
  return (
    <Box sx={{
      p:4, borderRadius:3, bgcolor:'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
      background:'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)'
    }}>
      <Typography variant="h3" sx={{fontWeight:700, mb:2}}>Formamos futuro, impulsamos conocimiento.</Typography>
      <Typography variant="h6" sx={{mb:3, color:'text.secondary'}}>
        Carrera académica de calidad, investigación de impacto y extensión con la comunidad.
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" component={Link} to="/carreras">Ver Carreras</Button>
        <Button variant="outlined" component={Link} to="/ingresantes">Soy ingresante</Button>
      </Stack>
    </Box>
  );
}
