import { useState } from 'react';
import { forgot } from '../services/auth';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function ForgotPassword(){
  const [email,setEmail]=useState('');
  const [loading,setLoading]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if(!email) return toast('Ingresá tu email');
    
    try{
      setLoading(true);
      await forgot(email);
      toast.success('Si el correo existe en nuestra base de datos, te hemos enviado un email con instrucciones para restablecer tu contraseña.');
    }catch{
      toast.error('Ocurrió un error al intentar enviar el correo. Intenta nuevamente.');
    }finally{ 
      setLoading(false); 
    }
  };

  return (
    <Paper sx={{ maxWidth: 420, mx: 'auto', p: 3, mt: 8 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Olvidé mi contraseña</Typography>
      
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField 
            label="Email" 
            value={email} 
            onChange={e=>setEmail(e.target.value)} 
            type="email" 
            required
            fullWidth
          />
          <Button 
            variant="contained" 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Enviando…' : 'Enviar instrucciones'}
          </Button>
        </Stack>
      </form>
      
      <Box sx={{ mt: 2 }}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Typography variant="body2">Volver a Iniciar Sesión</Typography>
        </Link>
      </Box>
    </Paper>
  );
}