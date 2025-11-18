// src/pages/PortalHome.jsx
import { Typography, Stack, Button, Paper, Chip, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth.jsx";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { green, blueGrey } from "@mui/material/colors";

export default function PortalHome() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/portal", { replace: true });
  };

  const roleLabel =
    user?.role === "admin"
      ? "Administrador"
      : user?.role === "profesor"
      ? "Profesor"
      : user?.role === "estudiante"
      ? "Estudiante"
      : "Usuario";

  const roleColor =
    user?.role === "admin"
      ? "error"
      : user?.role === "profesor"
      ? "info"
      : "success";

  return (
    <Box sx={{ py: 4 }}>
      <Stack spacing={3}>
        {/* Encabezado */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            background:
              "linear-gradient(135deg, rgba(200,230,201,0.9), rgba(232, 245, 233, 0.95))",
            border: `1px solid ${green[200]}`,
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "999px",
                  bgcolor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 1,
                }}
              >
                <SchoolIcon sx={{ color: green[700], fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Bienvenida/o al Portal Académico
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sesión: <b>{user?.email}</b>
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                icon={<AdminPanelSettingsIcon sx={{ fontSize: 18 }} />}
                label={roleLabel}
                color={roleColor}
                variant="filled"
              />
              <Button
                onClick={handleLogout}
                size="small"
                startIcon={<LogoutIcon />}
                sx={{ color: blueGrey[700] }}
              >
                Salir
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {/* Accesos rápidos */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ alignItems: "stretch" }}
        >
          {/* Columna principal */}
          <Stack spacing={2} flex={2}>
            <Paper
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: `1px solid ${green[50]}`,
                boxShadow: 1,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Módulos disponibles
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Accedé rápidamente a las secciones principales según tu rol.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Button
                  component={Link}
                  to="/app/classes"
                  variant="contained"
                  startIcon={<ClassIcon />}
                  sx={{ flex: 1, minWidth: 180, bgcolor: green[600], "&:hover": { bgcolor: green[800] } }}
                >
                  Clases
                </Button>

                {(user?.role === "admin" || user?.role === "profesor") && (
                  <Button
                    component={Link}
                    to="/app/my-enrollments"
                    variant="outlined"
                    startIcon={<ListAltIcon />}
                    sx={{ flex: 1, minWidth: 180 }}
                  >
                    Inscripciones
                  </Button>
                )}

                {user?.role === "estudiante" && (
                  <Button
                    component={Link}
                    to="/app/my-enrollments"
                    variant="outlined"
                    startIcon={<ListAltIcon />}
                    sx={{ flex: 1, minWidth: 180 }}
                  >
                    Mis inscripciones
                  </Button>
                )}

                {user?.role === "estudiante" && (
                  <Button
                    component={Link}
                    to="/app/my-schedule"
                    variant="outlined"
                    startIcon={<AccessTimeIcon />}
                    sx={{ flex: 1, minWidth: 180 }}
                  >
                    Mi horario
                  </Button>
                )}

                {user?.role === "admin" && (
                  <Button
                    component={Link}
                    to="/app/subjects"
                    variant="outlined"
                    startIcon={<ClassIcon />}
                    sx={{ flex: 1, minWidth: 180 }}
                  >
                    Materias (admin)
                  </Button>
                )}
              </Stack>
            </Paper>
          </Stack>

          {/* Columna lateral */}
          <Paper
            sx={{
              p: 2.5,
              borderRadius: 3,
              flex: 1,
              border: `1px solid ${green[50]}`,
              bgcolor: "#fff",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Resumen rápido
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              • Rol actual: <b>{roleLabel}</b>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              • Desde este portal podés gestionar clases, inscripciones y
              exportar tu horario en PDF.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Usá el menú superior para volver al sitio público de la
              universidad.
            </Typography>
          </Paper>
        </Stack>
      </Stack>
    </Box>
  );
}
