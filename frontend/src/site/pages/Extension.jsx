import { Typography, List, ListItem } from '@mui/material';
export default function Extension(){
  return (
    <>
      <Typography variant="h4" sx={{mb:2}}>Extensión</Typography>
      <List>
        <ListItem>Programas en escuelas</ListItem>
        <ListItem>Vinculación con PyMEs y ONGs</ListItem>
        <ListItem>Capacitaciones abiertas</ListItem>
        <ListItem>Agenda cultural</ListItem>
      </List>
    </>
  );
}
