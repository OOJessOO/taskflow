import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();

  if (isLoading) {
    return <div style={{ padding: '2rem', fontFamily: 'var(--font-mono)' }}>{t('common.loading')}</div>;
  }

  if (!user) {
    return <Navigate to="/connexion" replace />;
  }

  return children;
}
