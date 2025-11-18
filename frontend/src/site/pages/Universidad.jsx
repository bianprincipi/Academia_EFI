import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  Divider
} from "@mui/material";
import { green, lightBlue, blueGrey } from "@mui/material/colors";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

// ✅ Imágenes (podés usar tus propias en public/img/universidad/)
const campus =
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80";
const biblioteca =
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80";
const laboratorio =
  "https://media.istockphoto.com/id/1600783430/es/foto/joven-y-alegre-mujer-hipster-estudiando-al-aire-libre-en-el-campus.jpg?s=612x612&w=0&k=20&c=ranQ2NU8mkDMUH6vBzpcbTeQbvRfilytZTiXuzze9cc=";

export default function Universidad() {
  return (
    <Box sx={{ width: "100%", overflow: "hidden", bgcolor: "#f5f7fb" }}>
      {/* HERO */}
      <Box
        sx={{
          minHeight: "80vh",
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
            background: `linear-gradient(135deg, ${lightBlue[900]}EE, ${green[800]}CC)`,
            zIndex: 0
          }
        }}
      >
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Stack
            spacing={3}
            alignItems="center"
            sx={{
              maxWidth: 800,
              mx: "auto",
              px: { xs: 2, md: 0 }
            }}
          >
            {/* Etiqueta arriba del título */}
            <Chip
              label="Inscripciones abiertas • Ciclo 2026"
              sx={{
                bgcolor: "rgba(255,255,255,0.12)",
                color: "#fff",
                borderColor: "rgba(255,255,255,0.4)",
                borderWidth: 1,
                borderStyle: "solid",
                backdropFilter: "blur(8px)"
              }}
            />

            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                letterSpacing: ".02em",
                mb: 1,
                fontSize: { xs: "2.6rem", md: "3.8rem" },
                textShadow: "0 12px 30px rgba(0,0,0,0.35)"
              }}
            >
              Universidad JSX Walke
            </Typography>

            <Typography
              variant="h6"
              sx={{
                maxWidth: 650,
                opacity: 0.92,
                fontWeight: 400,
                lineHeight: 1.7
              }}
            >
              Donde la innovación, la tecnología y el conocimiento se unen para
              formar líderes del futuro, listos para transformar el mundo real.
            </Typography>

            {/* Botones de acción */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 1 }}
            >
              <Button
                variant="contained"
                size="large"
                href="#carreras"
                sx={{
                  px: 4,
                  py: 1.3,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  bgcolor: green[500],
                  "&:hover": { bgcolor: green[600], transform: "translateY(-1px)" },
                  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                  transition: "all .25s ease"
                }}
              >
                Ver carreras disponibles
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="#historia"
                sx={{
                  px: 4,
                  py: 1.3,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                  borderColor: "rgba(255,255,255,0.8)",
                  color: "#fff",
                  backdropFilter: "blur(6px)",
                  bgcolor: "rgba(0,0,0,0.2)",
                  "&:hover": {
                    borderColor: "#fff",
                    bgcolor: "rgba(0,0,0,0.35)"
                  }
                }}
              >
                Conocer la universidad
              </Button>
            </Stack>

            {/* Stats cortitas */}
            <Grid
              container
              spacing={3}
              justifyContent="center"
              sx={{ mt: 1 }}
            >
              {[
                { label: "Estudiantes activos", value: "+4.500" },
                { label: "Programas académicos", value: "35" },
                { label: "Convenios internacionales", value: "18" }
              ].map((item) => (
                <Grid item xs={4} sm={3.2} md={3} key={item.label}>
                  <Box sx={{ opacity: 0.9 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, lineHeight: 1.1 }}
                    >
                      {item.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ opacity: 0.85, whiteSpace: "normal" }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* HISTORIA */}
      <Container maxWidth="lg" sx={{ py: 10 }} id="historia">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src={biblioteca}
              alt="Biblioteca Universitaria"
              sx={{
                width: "100%",
                borderRadius: "24px",
                boxShadow: "0 16px 35px rgba(15,23,42,0.18)",
                objectFit: "cover"
              }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography
              variant="overline"
              sx={{
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: green[700],
                fontWeight: 700
              }}
            >
              Sobre nosotros
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: blueGrey[900],
                mb: 2,
                mt: 1
              }}
            >
              Nuestra historia
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: blueGrey[700], mb: 2.5, lineHeight: 1.8 }}
            >
              Fundada en honor a <strong>JSX Walke</strong>, pionero en el
              desarrollo web moderno, la Universidad JSX Walke nació con el
              propósito de integrar la tecnología con la educación de calidad.
              Su filosofía se basa en la simplicidad, la colaboración y el
              pensamiento creativo.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: blueGrey[700], mb: 3, lineHeight: 1.8 }}
            >
              Desde sus primeros pasos, nuestra universidad ha sido un faro de
              innovación, con programas académicos que combinan excelencia
              técnica con compromiso humano. Hoy, somos una comunidad global
              comprometida con el aprendizaje continuo.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 1 }}
            >
              <Button
                variant="contained"
                color="success"
                size="medium"
                href="#carreras"
                sx={{ textTransform: "none", borderRadius: 999 }}
              >
                Explorar oferta académica
              </Button>
              <Button
                variant="text"
                size="medium"
                sx={{ textTransform: "none", color: blueGrey[700] }}
              >
                Descargar folleto institucional
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* VALORES / PILARES */}
      <Box
        sx={{
          bgcolor: green[50],
          py: 10
        }}
        id="carreras"
      >
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{
              display: "block",
              textAlign: "center",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: green[700],
              fontWeight: 700
            }}
          >
            Lo que nos define
          </Typography>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              mb: 1,
              mt: 1,
              fontWeight: 700,
              color: blueGrey[900]
            }}
          >
            Nuestros pilares
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              mb: 6,
              maxWidth: 680,
              mx: "auto",
              color: blueGrey[700]
            }}
          >
            Cada decisión académica, cada proyecto y cada clase se construyen
            sobre estos valores fundamentales.
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: <SchoolIcon sx={{ fontSize: 40, color: green[600] }} />,
                title: "Excelencia Académica",
                text: "Formamos profesionales competentes, curiosos y éticos, preparados para un mundo en constante cambio."
              },
              {
                icon: (
                  <PeopleIcon sx={{ fontSize: 40, color: lightBlue[600] }} />
                ),
                title: "Comunidad Inclusiva",
                text: "Celebramos la diversidad, promoviendo un entorno donde cada estudiante encuentra su voz y propósito."
              },
              {
                icon: <EmojiObjectsIcon sx={{ fontSize: 40, color: green[600] }} />,
                title: "Innovación Continua",
                text: "Integrando la tecnología y la creatividad para impulsar soluciones reales en la sociedad moderna."
              }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    textAlign: "center",
                    py: 4,
                    px: 2.5,
                    borderRadius: "24px",
                    border: "1px solid rgba(15,23,42,0.06)",
                    boxShadow: "0 10px 28px rgba(15,23,42,0.12)",
                    transition: "all 0.3s ease",
                    background:
                      "radial-gradient(circle at top, #ffffff 0, #f8fafc 55%, #ecfeff 100%)",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 16px 36px rgba(15,23,42,0.18)"
                    }
                  }}
                >
                  <Box
                    sx={{
                      mb: 2.5,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      bgcolor: "rgba(22,163,74,0.06)"
                    }}
                  >
                    {item.icon}
                  </Box>
                  <CardContent sx={{ pt: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 1.5, color: blueGrey[900] }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: blueGrey[700], lineHeight: 1.7 }}
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
              variant="overline"
              sx={{
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: lightBlue[700],
                fontWeight: 700
              }}
            >
              Investigación y futuro
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: blueGrey[900], mb: 2 }}
            >
              Mirando hacia el futuro
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: blueGrey[700], lineHeight: 1.8, mb: 2.5 }}
            >
              La Universidad JSX Walke continúa expandiendo sus horizontes,
              integrando nuevas tecnologías, alianzas internacionales y
              proyectos de investigación que redefinen los límites del
              conocimiento. Nuestro objetivo: formar mentes libres que
              transformen el mundo.
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    p: 2,
                    borderColor: "rgba(148,163,184,0.5)"
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, mb: 0.5, color: blueGrey[900] }}
                  >
                    Laboratorios de última generación
                  </Typography>
                  <Typography variant="body2" sx={{ color: blueGrey[700] }}>
                    Espacios equipados para proyectos en IA, robótica y
                    desarrollo de software.
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    p: 2,
                    borderColor: "rgba(148,163,184,0.5)"
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, mb: 0.5, color: blueGrey[900] }}
                  >
                    Vinculación con empresas
                  </Typography>
                  <Typography variant="body2" sx={{ color: blueGrey[700] }}>
                    Programas de prácticas y residencias con referentes del
                    sector tecnológico.
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" sx={{ color: blueGrey[600] }}>
              ¿Te imaginás liderando el próximo gran cambio tecnológico?
              Empezá hoy tu camino con nosotros.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={laboratorio}
              alt="Laboratorio de innovación"
              sx={{
                width: "100%",
                borderRadius: "24px",
                boxShadow: "0 16px 40px rgba(15,23,42,0.2)",
                objectFit: "cover"
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* FOOTER SIMPLE */}
      <Box
        sx={{
          py: 4,
          bgcolor: "#020617",
          color: "rgba(148,163,184,0.9)"
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body2">
                © {new Date().getFullYear()} Universidad JSX Walke. Todos los
                derechos reservados.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ textAlign: { xs: "left", md: "right" } }}
            >
              <Typography variant="body2">
                Córdoba · Campus Central · Desarrollado con React & MUI
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
