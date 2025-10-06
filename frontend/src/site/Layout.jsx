import { Outlet, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { grey } from '@mui/material/colors';

export default function Layout(){
  const location = useLocation();
  return (
    <Box sx={{display:'flex',flexDirection:'column',minHeight:'100vh'}}>
      {/* HEADER */}
      <AppBar position="static" color="inherit" sx={{borderBottom:`1px solid ${grey[300]}`}}>
        <Toolbar sx={{justifyContent:'space-between'}}>
          <Typography variant="h6" sx={{fontWeight:600}}>Universidad</Typography>
          <Box sx={{display:'flex',gap:1}}>
            {[
              {to:'/',label:'Inicio'},
              {to:'/universidad',label:'Universidad'},
              {to:'/carreras',label:'Carreras'},
              {to:'/investigacion',label:'Investigación'},
              {to:'/extension',label:'Extensión'},
              {to:'/noticias',label:'Noticias'},
              {to:'/contacto',label:'Contacto'},
              {to:'/portal',label:'Portal'}
            ].map((nav)=>(
              <Button
                key={nav.to}
                component={Link}
                to={nav.to}
                variant={location.pathname===nav.to?'contained':'text'}
                size="small"
              >
                {nav.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* CONTENIDO */}
      <Container sx={{flex:1,py:4}}>
        <Outlet/>
      </Container>

      {/* FOOTER */}
      <Box component="footer" sx={{bgcolor:grey[200],py:2,mt:4}}>
        <Container sx={{textAlign:'center'}}>
          <Typography variant="body2" color="text.secondary">
            © 2025 Universidad — Todos los derechos reservados.
          </Typography>
          <Box sx={{mt:1,display:'flex',justifyContent:'center',gap:2}}>
            <Link to="/privacidad" style={{color:grey[700],textDecoration:'none'}}>Privacidad</Link>
            <Link to="/terminos" style={{color:grey[700],textDecoration:'none'}}>Términos</Link>
            <Link to="/accesibilidad" style={{color:grey[700],textDecoration:'none'}}>Accesibilidad</Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
