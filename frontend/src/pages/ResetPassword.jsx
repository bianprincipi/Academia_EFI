import { useEffect, useState } from 'react';
import { reset } from '../services/auth';
import toast from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ResetPassword(){
  const [token,setToken]=useState('');
  const [pass,setPass]=useState('');
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    const p = new URLSearchParams(location.search);
    setToken(p.get('token')||'');
  },[]);

  const submit = async()=>{
    if(!token) return toast.error('Falta token');
    if(!pass) return toast('Ingresá una nueva contraseña');
    try{
      setLoading(true);
      await reset(token, pass);
      toast.success('Contraseña actualizada. Ya podés iniciar sesión.');
    }catch(e){
      toast.error(e?.response?.data?.message || 'No se pudo actualizar');
    }finally{ setLoading(false); }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Restablecer contraseña</Typography>
      <TextField label="Nueva contraseña" type="password" value={pass} onChange={e=>setPass(e.target.value)} />
      <Button variant="contained" onClick={submit} disabled={loading}>Actualizar</Button>
    </Stack>
  );
}
