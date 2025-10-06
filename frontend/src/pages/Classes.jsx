import { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Stack } from '@mui/material';
import { useAuth } from '../auth.jsx';
import { listClasses } from '../services/classes';
import { enroll } from '../services/enrollments';
import { pdfRoster } from '../services/reports';

export default function Classes(){
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async()=>{
    setLoading(true);
    try{
      const { data } = await listClasses();
      setRows(data || []);
    }finally{ setLoading(false); }
  };

  useEffect(()=>{ load(); },[]);

  const doEnroll = async (classId)=>{
    try{
      await enroll(user.id, classId);
      alert('Inscripción realizada');
    }catch(e){
      alert(e?.response?.data?.message || 'No se pudo inscribir');
    }
  };

  const openRosterPDF = async (classId)=>{
    try{
      const { data } = await pdfRoster(classId);
      const url = URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
      window.open(url, '_blank');
    }catch{
      alert('No se pudo generar el PDF');
    }
  };

  return (
    <Paper sx={{p:3}}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb:2}}>
        <Typography variant="h5">Clases</Typography>
        <Typography variant="body2" color="text.secondary">
          Sesión: {user?.email} ({user?.role})
        </Typography>
      </Stack>

      {loading ? 'Cargando…' : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Materia</TableCell>
              <TableCell>Docente</TableCell>
              <TableCell>Horario</TableCell>
              <TableCell>Aula</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(r=>(
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r?.subject?.name}</TableCell>
                <TableCell>{r?.teacher?.name}</TableCell>
                <TableCell>{r.schedule}</TableCell>
                <TableCell>{r.room}</TableCell>
                <TableCell align="right">
                  {user?.role === 'estudiante' && (
                    <Button size="small" variant="contained" onClick={()=>doEnroll(r.id)}>
                      Inscribirme
                    </Button>
                  )}
                  {(user?.role === 'profesor' || user?.role === 'admin') && (
                    <Button size="small" sx={{ml:1}} onClick={()=>openRosterPDF(r.id)}>
                      Inscriptos (PDF)
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {rows.length===0 && (
              <TableRow><TableCell colSpan={6}>Sin clases</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}
