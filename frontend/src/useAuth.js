import { useContext } from 'react';
import { AuthCtx } from './context/AuthContext'; // Asegúrate de que AuthCtx esté exportado

export const useAuth = () => {
  const context = useContext(AuthCtx);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};