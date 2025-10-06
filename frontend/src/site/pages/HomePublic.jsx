import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Hero from '../components/Hero.jsx';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const CardBox = ({title, text, to}) => (
  <Paper elevation={0} variant="outlined" sx={{p:2, height:'100%'}}>
    <Typography variant="h6" sx={{mb:1}}>{title}</Typography>
    <Typography variant="body2" sx={{mb:2, color:'text.secondary'}}>{text}</Typography>
    {to && <Button component={Link} to={to}>Ver más</Button>}
  </Paper>
);

export default function HomePublic(){
  return (
    <>
      <Hero/>
      <Typography variant="h5" sx={{mt:4, mb:2}}>Destacados</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}><CardBox title="Oferta Académica" text="Conocé nuestras carreras de grado y posgrado." to="/carreras" /></Grid>
        <Grid item xs={12} md={4}><CardBox title="Investigación" text="Grupos, proyectos y publicaciones científicas." to="/investigacion" /></Grid>
        <Grid item xs={12} md={4}><CardBox title="Extensión" text="Programas y actividades con la comunidad." to="/extension" /></Grid>
      </Grid>
      <Typography variant="h5" sx={{mt:4, mb:2}}>Noticias</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}><CardBox title="Convocatoria a becas" text="Abrió la nueva convocatoria a becas de investigación." to="/noticias"/></Grid>
        <Grid item xs={12} md={4}><CardBox title="Jornadas 2025" text="Inscribite a nuestras jornadas académicas anuales." to="/noticias"/></Grid>
        <Grid item xs={12} md={4}><CardBox title="Nuevas aulas" text="Inauguramos espacios para prácticas y laboratorios." to="/noticias"/></Grid>
      </Grid>
    </>
  );
}
