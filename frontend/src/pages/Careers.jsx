// src/pages/Careers.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";
import { apiFetch } from "../services/api";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import { green, blueGrey } from "@mui/material/colors";

export default function Careers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await apiFetch("/careers");
        setCareers(data || []);
      } catch (err) {
        console.error("Error cargando carreras:", err);
        setError("No se pudieron cargar las carreras.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const getIcon = (career) => {
    const name = career.name?.toLowerCase() || "";
    if (name.includes("software") || name.includes("programación")) {
      return <CodeIcon />;
    }
    if (name.includes("datos") || name.includes("data")) {
      return <StorageIcon />;
    }
    return <SchoolIcon />;
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Encabezado */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: green[800], mb: 1 }}
        >
          Carreras de la Facultad de Software
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Programas orientados al desarrollo de software, datos y tecnología.
        </Typography>
      </Box>

      {loading && (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress />
        </Stack>
      )}

      {error && !loading && (
        <Typography color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      )}

      {!loading && !error && careers.length === 0 && (
        <Typography color="text.secondary" sx={{ textAlign: "center" }}>
          No hay carreras registradas por el momento.
        </Typography>
      )}

      {/* Tarjetas de carreras */}
      {!loading && !error && careers.length > 0 && (
        <Grid container spacing={3}>
          {careers.map((career) => (
            <Grid item xs={12} sm={6} md={4} key={career.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 2.5,
                  height: "100%",
                  borderRadius: 3,
                  border: `1px solid ${green[50]}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  sx={{ mb: 1 }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "999px",
                      bgcolor: green[50],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: green[700],
                    }}
                  >
                    {getIcon(career)}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {career.name}
                  </Typography>
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ flexGrow: 1 }}
                >
                  {career.description || "Sin descripción."}
                </Typography>

                {career.modality && (
                  <Chip
                    label={career.modality}
                    size="small"
                    sx={{
                      mt: 1,
                      alignSelf: "flex-start",
                      bgcolor: blueGrey[50],
                    }}
                  />
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
