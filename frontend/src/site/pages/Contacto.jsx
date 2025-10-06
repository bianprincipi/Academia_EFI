import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';

export default function Contacto(){
  const onSubmit = (e)=>{
    e.preventDefault();
    toast.success('Mensaje enviado (demo)');
    e.target.reset();
  };
  return (
    <Stack spacing={2} component="form" onSubmit={onSubmit}>
      <Typography variant="h4">Contacto</Typography>
      <TextField label="Nombre" required />
      <TextField label="Email" type="email" required />
      <TextField label="Mensaje" multiline minRows={3} required />
      <Button type="submit" variant="contained">Enviar</Button>
    </Stack>
  );
}
