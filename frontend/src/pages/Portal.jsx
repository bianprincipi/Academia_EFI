import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth.jsx';
import Login from './Login.jsx';

export default function Portal(){
  const { user } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (user) nav('/portal/home', { replace: true });
  }, [user, nav]);

  if (!user) return <Login />;
  return null;
}
