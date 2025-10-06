import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Inicio(){
  return (
    <Box sx={{textAlign:'center',py:8}}>
      <Typography variant="h3" sx={{mb:2,fontWeight:600}}>
        Bienvenidos al Portal Universitario
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{mb:3}}>
        Formación, investigación y extensión al servicio del conocimiento.
      </Typography>
      <Button component={Link} to="/portal" variant="contained" size="large">
        Ingresar al Sistema Académico
      </Button>
    </Box>
  );
}
