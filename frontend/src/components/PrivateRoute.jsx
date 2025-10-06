import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth.jsx';

export default function PrivateRoute({ roles = [], children }) {
  const { user } = useAuth();

  // si no hay sesión, al login del portal
  if (!user) return <Navigate to="/portal" replace />;

  // si hay restricción de rol y no cumple, a /app/forbidden
  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/app/forbidden" replace />;
  }

  return children;
}
