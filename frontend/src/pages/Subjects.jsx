<<<<<<< HEAD
// src/pages/Subjects.jsx
import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { green } from "@mui/material/colors";
import { apiFetch } from "../services/api";
=======
import { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Stack, Button, TextField } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { listSubjects, createSubject, removeSubject } from '../services/subjects';
>>>>>>> ef762fb219b2ce7dca33f27864cd64ad708eb271

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadSubjects = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiFetch("/subjects"); // GET /subjects
      setSubjects(data || []);
    } catch (err) {
      console.error("Error cargando materias:", err);
      setError(err?.message || "No se pudieron cargar las materias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("El nombre de la materia es obligatorio.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await apiFetch("/subjects", {
        method: "POST",
        body: {
          name: form.name.trim(),
          description: form.description.trim() || null,
        },
      });

      setForm({ name: "", description: "" });
      await loadSubjects();
    } catch (err) {
      console.error("Error creando materia:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Error al crear la materia"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar esta materia?")) return;

    try {
      setDeletingId(id);
      setError("");
      await apiFetch(`/subjects/${id}`, { method: "DELETE" });
      await loadSubjects();
    } catch (err) {
      console.error("Error eliminando materia:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Error al eliminar la materia"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <LibraryBooksIcon sx={{ color: green[700] }} />
          <Typography variant="h5">Materias</Typography>
        </Stack>
        <Chip
          label="Solo administrador"
          color="error"
          size="small"
          sx={{ fontWeight: 500 }}
        />
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Desde aquí podés crear, listar y eliminar materias. El <b>ID</b> que
        ves en la tabla es el que usarás luego en la pantalla de{" "}
        <b>Clases</b> para crear una clase nueva.
      </Typography>

      {/* Formulario de alta */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          borderColor: green[100],
          backgroundColor: "#fafafa",
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          Crear nueva materia
        </Typography>

        <form onSubmit={handleCreate}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ alignItems: "center" }}
          >
            <TextField
              label="Nombre de la materia"
              value={form.name}
              onChange={handleChange("name")}
              size="small"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Descripción (opcional)"
              value={form.description}
              onChange={handleChange("description")}
              size="small"
              sx={{ flex: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              sx={{
                bgcolor: green[600],
                "&:hover": { bgcolor: green[800] },
                whiteSpace: "nowrap",
              }}
            >
              {saving ? "Guardando..." : "Crear materia"}
            </Button>
          </Stack>
        </form>
      </Paper>

      {/* Mensajes */}
      {loading && <Typography>Cargando materias...</Typography>}

      {error && !loading && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && subjects.length === 0 && (
        <Typography color="text.secondary">
          No hay materias cargadas por el momento.
        </Typography>
      )}

      {/* Tabla de materias */}
      {!loading && !error && subjects.length > 0 && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width={70}>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell width={80} align="center">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((subj) => (
              <TableRow key={subj.id}>
                <TableCell>{subj.id}</TableCell>
                <TableCell>{subj.name}</TableCell>
                <TableCell>{subj.description || "-"}</TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(subj.id)}
                    disabled={deletingId === subj.id}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}
