import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth.jsx';

import Layout from './site/Layout.jsx';

// Sitio público
import Inicio from './site/pages/Inicio.jsx';
import Universidad from './site/pages/Universidad.jsx';
import Carreras from './site/pages/Carreras.jsx';
import Investigacion from './site/pages/Investigacion.jsx';
import Extension from './site/pages/Extension.jsx';
import Noticias from './site/pages/Noticias.jsx';
import Ingresantes from './site/pages/Ingresantes.jsx';
import Contacto from './site/pages/Contacto.jsx';

// Portal
import Portal from './pages/Portal.jsx';
import PortalHome from './pages/PortalHome.jsx';

// App académica
import PrivateRoute from './components/PrivateRoute.jsx';
import Subjects from './pages/Subjects.jsx';
import Classes from './pages/Classes.jsx';
import MyEnrollments from './pages/MyEnrollments.jsx';
import Forbidden from './pages/Forbidden.jsx';

function NotFound(){ return <div style={{padding:16}}>404 — Página no encontrada</div>; }

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            {/* Públicas */}
            <Route index element={<Inicio/>} />
            <Route path="universidad" element={<Universidad/>} />
            <Route path="carreras" element={<Carreras/>} />
            <Route path="investigacion" element={<Investigacion/>} />
            <Route path="extension" element={<Extension/>} />
            <Route path="noticias" element={<Noticias/>} />
            <Route path="ingresantes" element={<Ingresantes/>} />
            <Route path="contacto" element={<Contacto/>} />

            {/* Portal */}
            <Route path="portal" element={<Portal/>} />
            <Route path="portal/home" element={<PortalHome/>} />

            {/* App */}
            <Route path="app/forbidden" element={<Forbidden/>} />
            <Route path="app/subjects" element={
              <PrivateRoute roles={['admin']}><Subjects/></PrivateRoute>
            } />
            <Route path="app/classes" element={
              <PrivateRoute roles={['admin','profesor','estudiante']}><Classes/></PrivateRoute>
            } />
            <Route path="app/my-enrollments" element={
              <PrivateRoute roles={['estudiante','admin']}><MyEnrollments/></PrivateRoute>
            } />

            {/* catch-all */}
            <Route path="*" element={<NotFound/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
