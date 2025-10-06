import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link, NavLink } from 'react-router-dom';

const NavBtn = ({to, children}) => (
  <Button component={NavLink} to={to} color="inherit" sx={{'&.active':{fontWeight:'bold', textDecoration:'underline'}}}>{children}</Button>
);

export default function PublicLayout({ children }){
  return (
    <Box sx={{minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={{gap:1}}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Universidad • Sistema Académico
          </Typography>
          <NavBtn to="/">Inicio</NavBtn>
          <NavBtn to="/universidad">Universidad</NavBtn>
          <NavBtn to="/carreras">Carreras</NavBtn>
          <NavBtn to="/investigacion">Investigación</NavBtn>
          <NavBtn to="/extension">Extensión</NavBtn>
          <NavBtn to="/noticias">Noticias</NavBtn>
          <NavBtn to="/ingresantes">Ingresantes</NavBtn>
          <NavBtn to="/contacto">Contacto</NavBtn>
          <Button component={Link} to="/app/login" variant="contained">Portal</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{py:4, flex:1}} maxWidth="lg">
        {children}
      </Container>
      <Box component="footer" sx={{py:3, borderTop:'1px solid #eee', textAlign:'center', color:'text.secondary'}}>
        <Typography variant="body2">© {new Date().getFullYear()} Universidad — Todos los derechos reservados.</Typography>
      </Box>
    </Box>
  );
}
