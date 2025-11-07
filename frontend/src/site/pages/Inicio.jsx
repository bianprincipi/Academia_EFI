import {
  Box,
  Typography,
  Button,
  Container,
  AppBar,
  Toolbar,
  Chip,
  Grid,
  Card,
  CardContent
} from "@mui/material";
import { Link } from "react-router-dom";
import { green, lightBlue, blueGrey } from "@mui/material/colors";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolIcon from "@mui/icons-material/School";
import PublicIcon from "@mui/icons-material/Public";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

// ✅ Asegúrate de que esta ruta sea correcta:
import logoWalke from "../../assets/Walke_University.png";

export default function Inicio() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        background: `linear-gradient(135deg, ${lightBlue[50]} 0%, ${green[100]} 100%)`,
        backgroundImage:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fes%2Fs%2Ffotos%2Funiversidad&psig=AOvVaw2P9Hd8rfSwvjsA702Hs6C4&ust=1762302812890000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPCLqdyf15ADFQAAAAAdAAAAABB2")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${lightBlue[50]}CC 0%, ${green[100]}CC 100%)`,
          zIndex: 0,
        },
      }}
    >
      {/* --- Navbar ---
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255,255,255,0.7)",
          zIndex: 10,
          width: "100%",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            maxWidth: "lg",
            mx: "auto",
            width: "100%",
          }}
        >
          <Link
            to="/"
            style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
          >
            <Box
              component="img"
              src={logoWalke}
              alt="Logo Walke University"
              sx={{ height: { xs: "40px", md: "50px" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                color: green[800],
                display: { xs: "none", sm: "block" },
              }}
            >
              Walke University
            </Typography>
          </Link>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              component={Link}
              to="/carreras"
              variant="text"
              sx={{ color: green[700], "&:hover": { bgcolor: green[50] } }}
            >
              Carreras
            </Button>
            <Button
              component={Link}
              to="/universidad"
              variant="text"
              sx={{ color: green[700], "&:hover": { bgcolor: green[50] } }}
            >
              Sobre Nosotros
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                bgcolor: green[600],
                color: "#fff",
                fontWeight: 600,
                borderRadius: "20px",
                "&:hover": { bgcolor: green[800] },
              }}
            >
              Iniciar Sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar> */}

      {/* --- HERO: Sección principal que ocupa toda la pantalla --- */}
      <Box
        sx={{
          height: "100vh", // 👈 Ocupa toda la pantalla
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          px: 2,
        }}
      >
        <Chip
          label="Formando líderes del mañana"
          icon={<ArrowForwardIcon sx={{ transform: "rotate(-45deg)" }} />}
          sx={{
            mb: 4,
            bgcolor: green[100],
            color: green[700],
            fontWeight: 600,
            fontSize: "0.9rem",
            px: 2,
            py: 0.5,
            borderRadius: "16px",
            border: `1px solid ${green[300]}`,
            ".MuiChip-icon": {
              color: green[500],
            },
          }}
        />

        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: green[900],
            fontSize: { xs: "2.8rem", sm: "3.5rem", md: "4.5rem" },
            letterSpacing: -1,
          }}
        >
          Bienvenidos al Portal <br /> Universitario
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mb: 5,
            fontWeight: 400,
            maxWidth: "600px",
            mx: "auto",
            color: green[800],
            fontSize: { xs: "1.1rem", sm: "1.3rem" },
          }}
        >
          Formación, investigación y extensión al servicio del conocimiento. Tu futuro comienza aquí.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
          <Button
            component={Link}
            to="/portal"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: green[600],
              color: "#fff",
              fontSize: "1.1rem",
              fontWeight: 600,
              px: 6,
              py: 1.5,
              borderRadius: "50px",
              boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: green[800],
                transform: "translateY(-3px)",
                boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
              },
            }}
          >
            Ingresar al Sistema Académico
          </Button>

          <Button
            component={Link}
            to="/universidad"
            variant="outlined"
            size="large"
            sx={{
              color: green[700],
              borderColor: green[300],
              fontSize: "1.1rem",
              fontWeight: 600,
              px: 6,
              py: 1.5,
              borderRadius: "50px",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: green[500],
                bgcolor: green[50],
                transform: "translateY(-3px)",
              },
            }}
          >
            Conocer Más
          </Button>
        </Box>
      </Box>

      {/* --- Sección de características (3 tarjetas) --- */}
      <Container maxWidth="lg" sx={{ py: 8, position: "relative", zIndex: 1 }}>
        <Grid container spacing={4} justifyContent="center">
          {/* Tarjetas */}
          {[{
            icon: <SchoolIcon sx={{ fontSize: 40, color: green[600] }} />,
            title: "Excelencia Académica",
            text: "Programas de estudio diseñados para formar profesionales de clase mundial",
          }, {
            icon: <PublicIcon sx={{ fontSize: 40, color: lightBlue[600] }} />,
            title: "Comunidad Global",
            text: "Red internacional de estudiantes, profesores y egresados exitosos",
          }, {
            icon: <EmojiEventsIcon sx={{ fontSize: 40, color: green[600] }} />,
            title: "Reconocimiento",
            text: "Títulos y certificaciones reconocidos a nivel nacional e internacional",
          }].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  minHeight: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 3,
                  borderRadius: "16px",
                  boxShadow: "0px 8px 20px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0px 12px 25px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box sx={{ bgcolor: green[50], p: 2, borderRadius: "50%", mb: 2 }}>
                  {item.icon}
                </Box>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: green[800] }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* --- Sección de estadísticas --- */}
      <Box
        sx={{
          width: "100%",
          bgcolor: green[600],
          color: "white",
          py: 8,
          my: 8,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {[
              { number: "15K+", label: "Estudiantes" },
              { number: "200+", label: "Profesores" },
              { number: "50+", label: "Programas" },
              { number: "30+", label: "Países" },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} sx={{ textAlign: "center" }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {item.number}
                </Typography>
                <Typography variant="h6">{item.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

    
    </Box>
  );
}

