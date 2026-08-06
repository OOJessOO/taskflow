import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AppShell.module.css';
import Avatar from './Avatar';

export default function AppShell({ children }) {
  const { user, logout } = useAuth();
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
          <Link to="/tableau-de-bord" className={styles.navLink}>Tableau de bord</Link>
          <Link to="/profil" className={styles.navLink}>Profil</Link>
        </nav>

<div className={styles.userBlock}>
  <div className={styles.userInfo}>
    <Avatar user={user} size={36} />
    <p className={styles.userName}>{user?.name}</p>
  </div>
  <button className={styles.logoutButton} onClick={handleLogout}>
    Se déconnecter
  </button>
</div>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}
