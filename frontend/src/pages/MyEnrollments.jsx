import { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Stack } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { listByUser } from '../services/enrollments';
import { pdfSchedule } from '../services/reports';

export default function MyEnrollments(){
  const { user } = useAuth();
  const [rows, setRows] = useState([]);

  const load = async()=>{
    const { data } = await listByUser(user.id);
    setRows(data || []);
  };
  useEffect(()=>{ if(user?.id) load(); },[user?.id]);

  const openSchedulePDF = async ()=>{
    try{
      const { data } = await pdfSchedule(user.id);
      const url = URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
      window.open(url, '_blank');
    }catch{
      alert('No se pudo generar el PDF');
    }
  };

  return (
    <Paper sx={{p:3}}>
      <Stack direction="row" justifyContent="space-between" sx={{mb:2}}>
        <Typography variant="h5">Mis inscripciones</Typography>
        <Button onClick={openSchedulePDF}>Descargar horario (PDF)</Button>
      </Stack>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Clase</TableCell>
            <TableCell>Materia</TableCell>
            <TableCell>Docente</TableCell>
            <TableCell>Horario</TableCell>
            <TableCell>Aula</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(r=>(
            <TableRow key={r.id}>
              <TableCell>{r.classId}</TableCell>
              <TableCell>{r.class?.subject?.name}</TableCell>
              <TableCell>{r.class?.teacher?.name}</TableCell>
              <TableCell>{r.class?.schedule}</TableCell>
              <TableCell>{r.class?.room}</TableCell>
            </TableRow>
          ))}
          {rows.length===0 && (
            <TableRow><TableCell colSpan={5}>Sin inscripciones</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
