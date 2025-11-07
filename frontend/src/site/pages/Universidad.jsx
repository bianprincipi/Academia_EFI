import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent
} from "@mui/material";
import { green, lightBlue, blueGrey } from "@mui/material/colors";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

// ✅ Imágenes (podés usar tus propias en public/img/universidad/)
const campus = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80";
const biblioteca = "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80";
const laboratorio = "https://images.unsplash.com/photo-1581091012184-7af0a5c1cbf1?auto=format&fit=crop&w=1200&q=80";

export default function Universidad() {
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {/* HERO */}
      <Box
        sx={{
          minHeight: "70vh",
          backgroundImage: `url(${campus})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(135deg, ${lightBlue[900]}AA, ${green[800]}CC)`,
            zIndex: 0,
          },
        }}
      >
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2.5rem", md: "4rem" },
            }}
          >
            Universidad JSX Walke
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: "700px",
              mx: "auto",
              opacity: 0.9,
              fontWeight: 400,
            }}
          >
            Donde la innovación, la tecnología y el conocimiento se unen para formar líderes del futuro.
          </Typography>
        </Container>
      </Box>

      {/* HISTORIA */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={biblioteca}
              alt="Biblioteca Universitaria"
              sx={{
                width: "100%",
                borderRadius: "20px",
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: green[800], mb: 2 }}
            >
              Nuestra Historia
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: blueGrey[700], mb: 2, lineHeight: 1.8 }}
            >
              Fundada en honor a <strong>JSX Walke</strong>, pionero en el
              desarrollo web moderno, la Universidad JSX Walke nació con el
              propósito de integrar la tecnología con la educación de calidad.
              Su filosofía se basa en la simplicidad, la colaboración y el
              pensamiento creativo.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: blueGrey[700], lineHeight: 1.8 }}
            >
              Desde sus primeros pasos, nuestra universidad ha sido un faro de
              innovación, con programas académicos que combinan excelencia
              técnica con compromiso humano. Hoy, somos una comunidad global
              comprometida con el aprendizaje continuo.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* VALORES */}
      <Box
        sx={{
          bgcolor: green[50],
          py: 10,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              mb: 6,
              fontWeight: 700,
              color: green[800],
            }}
          >
            Nuestros Pilares
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <SchoolIcon sx={{ fontSize: 40, color: green[600] }} />,
                title: "Excelencia Académica",
                text: "Formamos profesionales competentes, curiosos y éticos, preparados para un mundo en constante cambio.",
              },
              {
                icon: <PeopleIcon sx={{ fontSize: 40, color: lightBlue[600] }} />,
                title: "Comunidad Inclusiva",
                text: "Celebramos la diversidad, promoviendo un entorno donde cada estudiante encuentra su voz y propósito.",
              },
              {
                icon: <EmojiObjectsIcon sx={{ fontSize: 40, color: green[600] }} />,
                title: "Innovación Continua",
                text: "Integrando la tecnología y la creatividad para impulsar soluciones reales en la sociedad moderna.",
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    textAlign: "center",
                    py: 4,
                    px: 2,
                    borderRadius: "20px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{item.icon}</Box>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: blueGrey[700], lineHeight: 1.6 }}
                    >
                      {item.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* LABORATORIO / FUTURO */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: green[800], mb: 2 }}
            >
              Mirando hacia el Futuro
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: blueGrey[700], lineHeight: 1.8 }}
            >
              La Universidad JSX Walke continúa expandiendo sus horizontes,
              integrando nuevas tecnologías, alianzas internacionales y
              proyectos de investigación que redefinen los límites del
              conocimiento. Nuestro objetivo: formar mentes libres que transformen el mundo.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={laboratorio}
              alt="Laboratorio de innovación"
              sx={{
                width: "100%",
                borderRadius: "20px",
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}


