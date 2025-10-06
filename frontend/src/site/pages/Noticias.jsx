import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Noticias(){
  const [notas, setNotas] = useState([]);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async ()=>{
      try{
        setLoading(true); setErr('');
        const res = await fetch('/news.json', { cache: 'no-store' });
        if(!res.ok) throw new Error('HTTP '+res.status);
        const data = await res.json();
        setNotas(Array.isArray(data) ? data : []);
      }catch(e){
        setErr('No se pudieron cargar las noticias');
      }finally{
        setLoading(false);
      }
    })();
  },[]);

  return (
    <>
      <Typography variant="h4" sx={{mb:2}}>Noticias</Typography>
      {loading && <Typography variant="body2" color="text.secondary">Cargando…</Typography>}
      {err && <Typography variant="body2" color="error">{err}</Typography>}
      <Stack spacing={2}>
        {notas.map((n,i)=>(
          <Paper key={i} variant="outlined" sx={{p:2}}>
            <Typography variant="h6">{n.titulo}</Typography>
            <Typography variant="body2" color="text.secondary">{n.bajada}</Typography>
            <Typography variant="caption" color="text.secondary">{n.fecha}</Typography>
            {n.link && (
              <div style={{marginTop:8}}>
                <Button size="small" href={n.link}>Leer más</Button>
              </div>
            )}
          </Paper>
        ))}
        {!loading && notas.length === 0 && !err && (
          <Typography variant="body2" color="text.secondary">No hay noticias por el momento.</Typography>
        )}
      </Stack>
    </>
  );
}
