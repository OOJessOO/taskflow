import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ padding: '2rem', fontFamily: 'var(--font-mono)' }}>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/connexion" replace />;
  }

  return children;
}
