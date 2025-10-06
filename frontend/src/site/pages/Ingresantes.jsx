import { Typography, List, ListItem, Button } from '@mui/material';
import { Link } from 'react-router-dom';
export default function Ingresantes(){
  return (
    <>
      <Typography variant="h4" sx={{mb:2}}>Ingresantes</Typography>
      <List>
        <ListItem>Requisitos de inscripción</ListItem>
        <ListItem>Fechas importantes</ListItem>
        <ListItem>Orientación al estudiante</ListItem>
      </List>
      <Button component={Link} to="/portal" variant="contained">Ir al Portal</Button>
    </>
  );
}
