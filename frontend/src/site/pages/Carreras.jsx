import { Typography, Grid, Paper } from '@mui/material';
const carreras=[
  { area:'Exactas', nombre:'Lic. en Informática' },
  { area:'Exactas', nombre:'Lic. en Matemática' },
  { area:'Sociales', nombre:'Lic. en Administración' },
  { area:'Humanidades', nombre:'Profesorado en Lengua' },
];
export default function Carreras(){
  return (
    <>
      <Typography variant="h4" sx={{mb:2}}>Carreras</Typography>
      <Grid container spacing={2}>
        {carreras.map((c,i)=>(
          <Grid item xs={12} md={6} key={i}>
            <Paper variant="outlined" sx={{p:2}}>
              <Typography variant="subtitle2" color="text.secondary">{c.area}</Typography>
              <Typography variant="h6">{c.nombre}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
