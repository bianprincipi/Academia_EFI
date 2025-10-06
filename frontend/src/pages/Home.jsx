import { useAuth } from '../auth.jsx';
import { Link } from 'react-router-dom';

export default function Home(){
  const { user } = useAuth();
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Academia EFI</h1>
      <p>Bienvenid@ {user ? `#${user.id} (${user.role})` : 'visitante'}</p>
      <div className="space-x-3">
        {user?.role === 'admin' && <Link className="underline" to="/subjects">Materias</Link>}
        {user && <Link className="underline" to="/classes">Clases</Link>}
        {(user?.role === 'estudiante' || user?.role === 'admin') && (
          <Link className="underline" to="/my-enrollments">Mis inscripciones</Link>
        )}
        {!user && <Link className="underline" to="/login">Iniciar sesión</Link>}
      </div>
    </div>
  );
}
