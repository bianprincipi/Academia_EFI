// src/pages/MySchedule.jsx
import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Button,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/PictureAsPdf";
import { useAuth } from "../auth.jsx";
import { apiFetch } from "../services/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function MySchedule() {
  const { user, token } = useAuth();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSchedule() {
      try {
        setLoading(true);
        setError("");

        const data = await apiFetch(`/reports/student-schedule/${user.id}`);
        setSchedule(data.schedule || []);
      } catch (err) {
        console.error("Error cargando horario:", err);
        setError("No se pudo cargar tu horario. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    }

    if (user?.id) {
      fetchSchedule();
    }
  }, [user]);

  const handleOpenPdf = () => {
    const url = `${API_URL}/reports/student-schedule/${user.id}?format=pdf&token=${token}`;
    window.open(url, "_blank", "noopener");
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <div>
          <Typography variant="h5" sx={{ mb: 0.5 }}>
            Mi horario
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Clases en las que estás inscripta/o.
          </Typography>
        </div>

        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleOpenPdf}
          disabled={!schedule.length}
        >
          Descargar PDF
        </Button>
      </Stack>

      {loading && (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress />
        </Stack>
      )}

      {error && !loading && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && schedule.length === 0 && (
        <Typography color="text.secondary">
          No tenés inscripciones cargadas todavía.
        </Typography>
      )}

      {!loading && !error && schedule.length > 0 && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Materia</TableCell>
              <TableCell>Profesor</TableCell>
              <TableCell>Horario</TableCell>
              <TableCell>Aula</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((item) => (
              <TableRow key={item.enrollmentId}>
                <TableCell>{item.subject?.name || "Sin materia"}</TableCell>
                <TableCell>
                  {item.teacher
                    ? `${item.teacher.name} (${item.teacher.email})`
                    : "Sin profesor"}
                </TableCell>
                <TableCell>{item.schedule || "-"}</TableCell>
                <TableCell>{item.room || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}
