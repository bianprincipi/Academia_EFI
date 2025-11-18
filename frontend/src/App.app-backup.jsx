import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute.jsx';
import Layout from './components/Layout.jsx';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Subjects from './pages/Subjects.jsx';
import Classes from './pages/Classes.jsx';
import MyEnrollments from './pages/MyEnrollments.jsx';
import Forbidden from './pages/Forbidden.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

function NotFound(){ return <div style={{padding:16}}>404 — Página no encontrada</div>; }

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />

            {/* Recupero de contraseña */}
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/reset-password" element={<ResetPassword/>} />

            {/* Autorización */}
            <Route path="/forbidden" element={<Forbidden/>} />

            {/* Rutas protegidas */}
            <Route path="/subjects" element={
              <PrivateRoute roles={['admin']}><Subjects/></PrivateRoute>
            } />
            <Route path="/classes" element={
              <PrivateRoute roles={['admin','profesor','estudiante']}><Classes/></PrivateRoute>
            } />
            <Route path="/my-enrollments" element={
              <PrivateRoute roles={['estudiante','admin']}><MyEnrollments/></PrivateRoute>
            } />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
