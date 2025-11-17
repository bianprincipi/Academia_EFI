import { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Stack, Button, TextField } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { listSubjects, createSubject, removeSubject } from '../services/subjects';

export default function Subjects(){
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const load = async()=>{
    const { data } = await listSubjects();
    setRows(data || []);
  };
  useEffect(()=>{ load(); },[]);

  const add = async()=>{
    if(!name) return;
    await createSubject({ name, description });
    setName(''); setDescription('');
    await load();
  };
  const del = async(id)=>{
    if(!confirm('¿Eliminar materia?')) return;
    await removeSubject(id);
    await load();
  };

  return (
    <Paper sx={{p:3}}>
      <Stack direction="row" justifyContent="space-between" sx={{mb:2}}>
        <Typography variant="h5">Materias</Typography>
        <Typography variant="body2" color="text.secondary">
          Sesión: {user?.email} ({user?.role})
        </Typography>
      </Stack>

      <Stack direction={{xs:'column', sm:'row'}} spacing={1} sx={{mb:2}}>
        <TextField label="Nombre" value={name} onChange={e=>setName(e.target.value)} size="small" />
        <TextField label="Descripción" value={description} onChange={e=>setDescription(e.target.value)} size="small" />
        <Button variant="contained" onClick={add}>Agregar</Button>
      </Stack>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(r=>(
            <TableRow key={r.id}>
              <TableCell>{r.id}</TableCell>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.description}</TableCell>
              <TableCell align="right">
                <Button size="small" color="error" onClick={()=>del(r.id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
          {rows.length===0 && (
            <TableRow><TableCell colSpan={4}>Sin materias</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
