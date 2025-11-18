// src/pages/Portal.jsx
import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import { green, blueGrey } from "@mui/material/colors";
import SchoolIcon from "@mui/icons-material/School";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth.jsx";
import api from "../services/api";

export default function Portal() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("estudiante@example.com"); // podés dejar un ej.
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Completá email y contraseña");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      const token = res.data?.token;
      if (!token) {
        throw new Error("Respuesta inválida del servidor");
      }
      login(token);
      nav("/portal/home", { replace: true });
    } catch (err) {
      console.error("Error login:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "No se pudo iniciar sesión";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          maxWidth: 420,
          width: "100%",
          borderRadius: 4,
          border: `1px solid ${green[100]}`,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(232, 245, 233, 0.98))",
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "999px",
                bgcolor: green[100],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SchoolIcon sx={{ color: green[700] }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Portal Académico
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Iniciá sesión para gestionar tus clases
              </Typography>
            </Box>
          </Stack>

          {error && (
            <Alert severity="error" variant="outlined">
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                size="small"
                label="Correo institucional"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <TextField
                size="small"
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                startIcon={<LockOpenIcon />}
                disabled={loading}
                sx={{
                  mt: 1,
                  bgcolor: green[600],
                  "&:hover": { bgcolor: green[800] },
                }}
              >
                {loading ? "Ingresando..." : "Ingresar al portal"}
              </Button>
            </Stack>
          </Box>

          <Typography
            variant="caption"
            color={blueGrey[600]}
            sx={{ textAlign: "center", mt: 1 }}
          >
            Roles soportados: administrador, profesor y estudiante.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
