// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './auth.jsx';

// import Layout from './site/Layout.jsx';

// // Sitio público
// import Inicio from './site/pages/Inicio.jsx';
// import Universidad from './site/pages/Universidad.jsx';
// import Carreras from './site/pages/Carreras.jsx';
// import Investigacion from './site/pages/Investigacion.jsx';
// import Extension from './site/pages/Extension.jsx';
// import Noticias from './site/pages/Noticias.jsx';
// import Ingresantes from './site/pages/Ingresantes.jsx';
// import Contacto from './site/pages/Contacto.jsx';

// // Portal
// import Portal from './pages/Portal.jsx';
// import PortalHome from './pages/PortalHome.jsx';

// // App académica
// import PrivateRoute from './components/PrivateRoute.jsx';
// import Subjects from './pages/Subjects.jsx';
// import Classes from './pages/Classes.jsx';
// import MyEnrollments from './pages/MyEnrollments.jsx';
// import Forbidden from './pages/Forbidden.jsx';

// function NotFound(){ return <div style={{padding:16}}>404 — Página no encontrada</div>; }

// export default function App(){
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Layout/>}>
//             {/* Públicas */}
//             <Route index element={<Inicio/>} />
//             <Route path="universidad" element={<Universidad/>} />
//             <Route path="carreras" element={<Carreras/>} />
//             <Route path="investigacion" element={<Investigacion/>} />
//             <Route path="extension" element={<Extension/>} />
//             <Route path="noticias" element={<Noticias/>} />
//             <Route path="ingresantes" element={<Ingresantes/>} />
//             <Route path="contacto" element={<Contacto/>} />

//             {/* Portal */}
//             <Route path="portal" element={<Portal/>} />
//             <Route path="portal/home" element={<PortalHome/>} />

//             {/* App */}
//             <Route path="app/forbidden" element={<Forbidden/>} />
//             <Route path="app/subjects" element={
//               <PrivateRoute roles={['admin']}><Subjects/></PrivateRoute>
//             } />
//             <Route path="app/classes" element={
//               <PrivateRoute roles={['admin','profesor','estudiante']}><Classes/></PrivateRoute>
//             } />
//             <Route path="app/my-enrollments" element={
//               <PrivateRoute roles={['estudiante','admin']}><MyEnrollments/></PrivateRoute>
//             } />

//             {/* catch-all */}
//             <Route path="*" element={<NotFound/>} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { AuthProvider } from "./auth.jsx";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
} from "@mui/material";
import { green, lightBlue, blueGrey } from "@mui/material/colors";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

// --- Logo principal ---
import logoWalke from "./assets/walke_university.png";

// --- Páginas ---
import Inicio from "./site/pages/Inicio.jsx";
import Universidad from "./site/pages/Universidad.jsx";
import Carreras from "./site/pages/Carreras.jsx";
import Investigacion from "./site/pages/Investigacion.jsx";
import Extension from "./site/pages/Extension.jsx";
import Noticias from "./site/pages/Noticias.jsx";
import Ingresantes from "./site/pages/Ingresantes.jsx";
import Contacto from "./site/pages/Contacto.jsx";
import Careers from './pages/Careers';
import Portal from "./pages/Portal.jsx";
import PortalHome from "./pages/PortalHome.jsx";
import MySchedule from './pages/MySchedule';

import PrivateRoute from "./components/PrivateRoute.jsx";
import Subjects from "./pages/Subjects.jsx";
import Classes from "./pages/Classes.jsx";
import MyEnrollments from "./pages/MyEnrollments.jsx";
import Forbidden from "./pages/Forbidden.jsx";

function NotFound() {
  return (
    <Container sx={{ py: 10, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        404 — Página no encontrada
      </Typography>
      <Button component={Link} to="/" variant="contained" color="success">
        Volver al inicio
      </Button>
    </Container>
  );
}

// --- Layout visual principal ---
function SiteLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage:
          'url("https://img.freepik.com/foto-gratis/edificio-universitario-moderna-fachada-vidrio_23-2148768792.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${lightBlue[50]}EE 0%, ${green[100]}EE 100%)`,
          zIndex: 0,
        },
      }}
    >
      {/* --- NAVBAR --- */}
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
              sx={{ color: green[700], "&:hover": { bgcolor: green[50] } }}
            >
              Carreras
            </Button>
             <Button
              component={Link}
              to="/ingresantes"
              sx={{ color: green[700], "&:hover": { bgcolor: green[50] } }}
            >
              Ingresantes
            </Button>
             <Button
              component={Link}
              to="/Noticias"
              sx={{ color: green[700], "&:hover": { bgcolor: green[50] } }}
            >
              Noticias
            </Button>
            <Button
              component={Link}
              to="/universidad"
              sx={{ color: green[700], "&:hover": { bgcolor: green[50] } }}
            >
              Universidad
            </Button>
            <Button
              component={Link}
              to="/portal"
              variant="contained"
              sx={{
                bgcolor: green[600],
                color: "#fff",
                borderRadius: "20px",
                fontWeight: 600,
                "&:hover": { bgcolor: green[800] },
              }}
            >
              Portal
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <Box sx={{ flexGrow: 1, width: "100%", position: "relative", zIndex: 1, py: 4 }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>

      {/* --- FOOTER --- */}
      <Box
        component="footer"
        sx={{
          width: "100%",
          py: 8,
          bgcolor: blueGrey[900],
          color: blueGrey[50],
          mt: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Columna 1 */}
            <Grid item xs={12} md={4}>
              <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                <Box component="img" src={logoWalke} alt="Logo" sx={{ height: "50px", mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
                  Walke University
                </Typography>
              </Link>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Comprometidos con la excelencia educativa y el desarrollo integral de nuestros estudiantes.
              </Typography>
            </Grid>

            {/* Columna 2 */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: green[400] }}>
                Enlaces Rápidos
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {["Carreras", "Admisiones", "Biblioteca", "Campus Central"].map((link) => (
                  <Typography
                    key={link}
                    variant="body2"
                    sx={{ cursor: "pointer", "&:hover": { color: green[300] } }}
                  >
                    {link}
                  </Typography>
                ))}
              </Box>
            </Grid>

            {/* Columna 3 */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: green[400] }}>
                Contacto
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon sx={{ fontSize: 18, color: green[300] }} /> info@walke.edu
                </Typography>
                <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon sx={{ fontSize: 18, color: green[300] }} /> +1 (555) 123-4567
                </Typography>
                <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <HomeIcon sx={{ fontSize: 18, color: green[300] }} /> Calle Universitaria 123, Ciudad
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ borderTop: `1px solid ${blueGrey[700]}`, mt: 6, pt: 4, textAlign: "center" }}>
            <Typography variant="body2" color={blueGrey[300]}>
              © {new Date().getFullYear()} Walke University. Todos los derechos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SiteLayout />}>
            {/* --- Páginas públicas --- */}
            <Route index element={<Inicio />} />
            <Route path="universidad" element={<Universidad />} />
            
            <Route path="investigacion" element={<Investigacion />} />
            <Route path="extension" element={<Extension />} />
            <Route path="noticias" element={<Noticias />} />
            <Route path="ingresantes" element={<Ingresantes />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="/carreras" element={<Careers />} />
            <Route path="/app/my-schedule" element={<MySchedule />} />


            {/* --- Portal --- */}
            <Route path="portal" element={<Portal />} />
            <Route path="portal/home" element={<PortalHome />} />

            {/* --- App académica --- */}
            <Route path="app/forbidden" element={<Forbidden />} />
            <Route
              path="app/subjects"
              element={
                <PrivateRoute roles={["admin"]}>
                  <Subjects />
                </PrivateRoute>
              }
            />
            <Route
              path="app/classes"
              element={
                <PrivateRoute roles={["admin", "profesor", "estudiante"]}>
                  <Classes />
                </PrivateRoute>
              }
            />
            <Route
              path="app/my-enrollments"
              element={
                <PrivateRoute roles={["estudiante", "admin"]}>
                  <MyEnrollments />
                </PrivateRoute>
              }
            />

            {/* --- Página no encontrada --- */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
