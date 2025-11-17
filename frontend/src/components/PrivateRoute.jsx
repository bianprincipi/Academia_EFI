import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

export default function PrivateRoute({ allowedRoles }) { 
  const { isAuthenticated, checkRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) { 
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !checkRole(allowedRoles)) {
    return <Navigate to="/forbidden" replace />; 
  }

  return <Outlet />;
}