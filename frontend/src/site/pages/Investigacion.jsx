import { Typography, List, ListItem } from '@mui/material';
export default function Investigacion(){
  return (
    <>
      <Typography variant="h4" sx={{mb:2}}>Investigación</Typography>
      <List>
        <ListItem>Proyectos I+D</ListItem>
        <ListItem>Grupos y laboratorios</ListItem>
        <ListItem>Convocatorias y becas</ListItem>
        <ListItem>Publicaciones y repositorio</ListItem>
      </List>
    </>
  );
}
