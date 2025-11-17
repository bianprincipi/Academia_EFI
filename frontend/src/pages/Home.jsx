import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

// Opcional: Instala 'react-icons' (npm install react-icons) para íconos
import { FaBook, FaUserGraduate, FaSignInAlt, FaTasks } from 'react-icons/fa';

export default function Home() {
  const { user } = useAuth();

  return (
    // Contenedor principal con fondo degradado suave (celeste y verde)
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-green-50 text-gray-800">
      
      {/* --- Barra de Navegación --- */}
      <nav className="w-full bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-700">
            Academia EFI
          </h1>
          <div className="space-x-4">
            {!user && (
              <Link 
                to="/login"
                className="flex items-center gap-2 bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-green-700 transition duration-300"
              >
                <FaSignInAlt />
                Iniciar sesión
              </Link>
            )}
            {/* Si el usuario está logueado, podríamos mostrar un "Mi Perfil" o "Salir" aquí */}
          </div>
        </div>
      </nav>

      {/* --- Sección "Hero" (Bienvenida) --- */}
      <header className="container mx-auto text-center pt-24 pb-16 px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          ¡Bienvenid@ {user ? ` #${user.id}` : 'a la Academia'}!
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {user 
            ? `Hola ${user.role}, aquí tienes tus accesos directos para comenzar.` 
            : "Tu plataforma para la excelencia académica. Explora nuestras clases e inscríbete hoy."}
        </p>
      </header>

      {/* --- Sección de Acciones (Tus links) --- */}
      <main className="container mx-auto px-6 pb-24">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-sky-800 mb-8 text-center">
            {user ? 'Tus Accesos Directos' : 'Comienza Ahora'}
          </h3>
          
          {/* Contenedor de "Tarjetas" de acción */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tus links, ahora estilizados como "tarjetas" */}
            {user?.role === 'admin' && (
              <Link 
                className="group block p-6 bg-green-100 rounded-lg shadow hover:bg-green-200 transition duration-300" 
                to="/subjects"
              >
                <FaBook className="text-3xl text-green-700 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-semibold text-green-900 mb-1">Gestionar Materias</h4>
                <p className="text-green-800">Acceso solo para administradores.</p>
              </Link>
            )}

            {user && (
              <Link 
                className="group block p-6 bg-sky-100 rounded-lg shadow hover:bg-sky-200 transition duration-300" 
                to="/classes"
              >
                <FaTasks className="text-3xl text-sky-700 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-semibold text-sky-900 mb-1">Ver Clases</h4>
                <p className="text-sky-800">Explora todas las clases disponibles.</p>
              </Link>
            )}

            {(user?.role === 'estudiante' || user?.role === 'admin') && (
              <Link 
                className="group block p-6 bg-sky-100 rounded-lg shadow hover:bg-sky-200 transition duration-300" 
                to="/my-enrollments"
              >
                <FaUserGraduate className="text-3xl text-sky-700 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-semibold text-sky-900 mb-1">Mis Inscripciones</h4>
                <p className="text-sky-800">Revisa las clases a las que te apuntaste.</p>
              </Link>
            )}

            {/* Mensaje para visitantes */}
            {!user && (
                <div className="p-6 bg-gray-100 text-gray-700 rounded-lg text-center md:col-span-2">
                  <p className="text-lg">
                    <Link to="/login" className="font-semibold text-green-600 hover:underline">Inicia sesión</Link> o regístrate para ver tus clases e inscripciones.
                  </p>
                </div>
            )}
          </div>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="w-full bg-gray-800 text-white p-6 text-center mt-12">
        <p>&copy; {new Date().getFullYear()} Academia EFI. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}