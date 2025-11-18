<<<<<<< HEAD
// src/pages/Classes.jsx
import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Button,
  Alert,
} from "@mui/material";
import { useAuth } from "../auth.jsx";
import { apiFetch } from "../services/api";
=======
import { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Stack } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { listClasses } from '../services/classes';
import { enroll } from '../services/enrollments';
import { pdfRoster } from '../services/reports';
>>>>>>> ef762fb219b2ce7dca33f27864cd64ad708eb271

export default function Classes() {
  const { user, token } = useAuth();
  const [classes, setClasses] = useState([]);
  const [enrollments, setEnrollments] = useState([]); // inscripciones del alumno
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingEnroll, setLoadingEnroll] = useState(false);

  // Cargar clases y, si es estudiante, sus inscripciones
  useEffect(() => {
    async function load() {
      if (!token || !user) return;

      setLoading(true);
      setError("");
      setSuccess("");

      try {
        // 1) Obtener todas las clases
        const cls = await apiFetch("/classes", { token });
        setClasses(Array.isArray(cls) ? cls : []);

        // 2) Si es estudiante, traer inscripciones para saber a qué ya está inscripto
        if (user.role === "estudiante") {
          const data = await apiFetch(`/enrollments/${user.id}`, { token });
          const list = Array.isArray(data) ? data : data.enrollments || [];
          setEnrollments(list);
        } else {
          setEnrollments([]);
        }
      } catch (err) {
        console.error("Error cargando clases:", err);
        setError(err.message || "No se pudieron cargar las clases");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token, user]);

  // helper: saber si ya está inscripto a una clase
  const isEnrolled = (classId) => {
    return enrollments.some((enr) => enr.classId === classId);
  };

  // Inscribirse a una clase
  const handleEnroll = async (cls) => {
    if (!user || user.role !== "estudiante") return;

    try {
      setLoadingEnroll(true);
      setError("");
      setSuccess("");

      await apiFetch("/enrollments", {
        method: "POST",
        token,
        body: {
          userId: user.id,
          classId: cls.id,
        },
      });

      setSuccess(`Te inscribiste a ${cls.subject?.name || "la clase " + cls.id}`);

      // volver a cargar inscripciones para reflejar el cambio
      const data = await apiFetch(`/enrollments/${user.id}`, { token });
      const list = Array.isArray(data) ? data : data.enrollments || [];
      setEnrollments(list);
    } catch (err) {
      console.error("Error al inscribirse:", err);
      setError(err.response?.data?.message || err.message || "No se pudo inscribir");
    } finally {
      setLoadingEnroll(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5">Clases</Typography>
        <Typography variant="body2" color="text.secondary">
          Sesión: ({user?.role || "sin sesión"})
        </Typography>
      </Stack>

      {loading && <Typography>Cargando clases...</Typography>}

      {!loading && error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {!loading && !error && classes.length === 0 && (
        <Typography color="text.secondary">Sin clases</Typography>
      )}

      {!loading && !error && classes.length > 0 && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Materia</TableCell>
              <TableCell>Docente</TableCell>
              <TableCell>Horario</TableCell>
              <TableCell>Aula</TableCell>
              {user?.role === "estudiante" && <TableCell>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell>{cls.id}</TableCell>
                <TableCell>{cls.subject?.name || "-"}</TableCell>
                <TableCell>
                  {cls.teacher ? cls.teacher.name : "Sin docente"}
                </TableCell>
                <TableCell>{cls.schedule || "-"}</TableCell>
                <TableCell>{cls.room || "-"}</TableCell>

                {user?.role === "estudiante" && (
                  <TableCell>
                    {isEnrolled(cls.id) ? (
                      <Button size="small" disabled>
                        Inscripto
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleEnroll(cls)}
                        disabled={loadingEnroll}
                      >
                        Inscribirme
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}

