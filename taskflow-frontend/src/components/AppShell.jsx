import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AppShell.module.css';
import Avatar from './Avatar';
import LanguageToggle from './LanguageToggle';

export default function AppShell({ children }) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/connexion');
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.spine}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>TF</span>
          <span className={styles.brandName}>TaskFlow</span>
        </div>

        <nav className={styles.nav}>
          <Link to="/tableau-de-bord" className={styles.navLink}>{t('nav.dashboard')}</Link>
          <Link to="/profil" className={styles.navLink}>{t('nav.profile')}</Link>
        </nav>

        <LanguageToggle variant="dark" className={styles.langToggle} />

<div className={styles.userBlock}>
  <div className={styles.userInfo}>
    <Avatar user={user} size={36} />
    <p className={styles.userName}>{user?.name}</p>
  </div>
  <button className={styles.logoutButton} onClick={handleLogout}>
    {t('nav.logout')}
  </button>
</div>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}
