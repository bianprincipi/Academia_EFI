import { createContext, useContext, useEffect, useState } from 'react';

function safeDecodeJWT(t) {
  try {
    if (!t || typeof t !== 'string' || !t.includes('.')) return null;
    const base64 = t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json); // { id, role, iat, exp } si es válido
  } catch {
    return null;
  }
}

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) { setUser(null); return; }
    const u = safeDecodeJWT(token);
    if (u) setUser(u);
    else {
      console.warn('Token inválido, limpiando.');
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  }, [token]);

  const login  = (tok) => { localStorage.setItem('token', tok); setToken(tok); };
  const logout = ()   => { localStorage.removeItem('token'); setToken(null); setUser(null); };

  // debug no intrusivo
  if (import.meta.env.DEV) console.log('AuthProvider:', { hasToken: !!token, user });

  return <AuthCtx.Provider value={{ token, user, login, logout }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
