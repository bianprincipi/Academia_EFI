// src/pages/MyEnrollments.jsx
import { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Link as MuiLink,
  CircularProgress,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/PictureAsPdf';
import { useAuth } from '../auth.jsx';
import { apiFetch } from '../services/api';

// URL del backend (funciona con Vite + env)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function MyEnrollments() {
  const { user, token } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar inscripciones del estudiante
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError('');

        const data = await apiFetch(`/enrollments/${user.id}`, { token });

        // Asegurar compatibilidad con backend
        const list = Array.isArray(data)
          ? data
          : data?.enrollments
          ? data.enrollments
          : [];

        setEnrollments(list);
      } catch (err) {
        console.error('Error cargando inscripciones:', err);
        setError(err.message || 'No se pudieron cargar las inscripciones');
      } finally {
        setLoading(false);
      }
    }

    if (user?.id && token) load();
  }, [user, token]);

  // 🔹 Botón PDF
  const handleDownloadPdf = (e) => {
    e.preventDefault();
    const url = `${API_URL}/reports/student-schedule/${user.id}?format=pdf&token=${token}`;
    window.open(url, '_blank', 'noopener');
  };

  return (
    <Paper sx={{ p: 3 }}>
      {/* Encabezado */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5">Mis inscripciones</Typography>

        <MuiLink
          href="#"
          onClick={handleDownloadPdf}
          sx={{
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            fontWeight: 600,
          }}
        >
          <DownloadIcon fontSize="small" /> Descargar horario (PDF)
        </MuiLink>
      </Stack>

      {/* Loading */}
      {loading && (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress />
        </Stack>
      )}

      {/* Error */}
      {error && !loading && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Sin inscripciones */}
      {!loading && !error && enrollments.length === 0 && (
        <Typography color="text.secondary">
          No estás inscripta/o en ninguna clase todavía.
        </Typography>
      )}

      {/* Tabla de inscripciones */}
      {!loading && !error && enrollments.length > 0 && (
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
            {enrollments.map((enr) => (
              <TableRow key={enr.id}>
                <TableCell>{enr.classId}</TableCell>

                <TableCell>{enr.class?.subject?.name || '-'}</TableCell>

                <TableCell>
                  {enr.class?.teacher
                    ? enr.class.teacher.name
                    : 'Sin docente'}
                </TableCell>

                <TableCell>{enr.class?.schedule || '-'}</TableCell>
                <TableCell>{enr.class?.room || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}
