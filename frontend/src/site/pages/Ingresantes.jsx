import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import { Link } from "react-router-dom";
import { green, blueGrey } from "@mui/material/colors";
import SchoolIcon from "@mui/icons-material/School";
import ChecklistIcon from "@mui/icons-material/Checklist";
import EventIcon from "@mui/icons-material/Event";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

export default function Ingresantes() {
  return (
    <Box sx={{ width: "100%", py: 6 }}>
      {/* TÍTULO */}
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          color: green[800],
          mb: 1,
        }}
      >
        Bienvenidos Ingresantes
      </Typography>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          color: blueGrey[600],
          mb: 6,
        }}
      >
        Todo lo que necesitás para comenzar tu camino en la Universidad JSX Walke
      </Typography>

      {/* SECCIONES */}
      <Grid container spacing={4} maxWidth="lg" sx={{ mx: "auto" }}>
        {/* Requisitos */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <ChecklistIcon sx={{ fontSize: 50, color: green[600], mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Requisitos de inscripción
              </Typography>

              <List dense>
                <ListItem>
                  <ListItemText primary="Documento de identidad" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Certificado analítico o constancia" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Formulario de preinscripción online" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Fechas */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <EventIcon sx={{ fontSize: 50, color: green[600], mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Fechas importantes
              </Typography>

              <List dense>
                <ListItem>
                  <ListItemText primary="Inscripciones: Enero – Marzo" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Curso nivelatorio: 15 de Febrero" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Inicio de clases: 10 de Marzo" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Orientación */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <EmojiPeopleIcon
                sx={{ fontSize: 50, color: green[600], mb: 1 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Orientación al estudiante
              </Typography>

              <List dense>
                <ListItem>
                  <ListItemText primary="Charlas informativas" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Recorridos guiados por el campus" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Tutorías para ingresantes" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* BOTÓN */}
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Button
          component={Link}
          to="/portal"
          variant="contained"
          size="large"
          sx={{
            px: 5,
            py: 1.4,
            borderRadius: "999px",
            fontSize: "1rem",
            bgcolor: green[600],
            "&:hover": { bgcolor: green[700] },
          }}
        >
          Ir al Portal del Estudiante
        </Button>
      </Box>
    </Box>
  );
}
