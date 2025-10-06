import { useState } from 'react';
import { forgot } from '../services/auth';
import toast from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ForgotPassword(){
  const [email,setEmail]=useState('');
  const [loading,setLoading]=useState(false);

  const submit = async()=>{
    if(!email) return toast('Ingresá tu email');
    try{
      setLoading(true);
      await forgot(email);
      toast.success('Si el correo existe, enviamos instrucciones');
    }catch(e){
      toast.error('No se pudo enviar el correo');
    }finally{ setLoading(false); }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Olvidé mi contraseña</Typography>
      <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <Button variant="contained" onClick={submit} disabled={loading}>Enviar</Button>
    </Stack>
  );
}
