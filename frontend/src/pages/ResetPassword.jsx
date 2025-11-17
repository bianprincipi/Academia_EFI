import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { reset } from '../services/auth';
import toast from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ResetPassword(){
  const { token: urlToken } = useParams(); 
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  useEffect(()=>{
    if (!urlToken) {
        toast.error('Token de restablecimiento de contraseña no encontrado en la URL.');
    }
  },[urlToken]); 

  const submit = async()=>{
    if(!urlToken) return toast.error('Falta token en la URL'); 
    if(!pass) return toast('Ingresá una nueva contraseña');
    
    try{
      setLoading(true);
      await reset(urlToken, pass); 
      toast.success('Contraseña actualizada. Ya podés iniciar sesión.');
      navigate('/login'); 
    }catch(e){
      toast.error(e?.response?.data?.message || 'No se pudo actualizar. Token inválido o expirado.');
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