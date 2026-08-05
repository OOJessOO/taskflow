import { useState } from 'react';
import AppShell from '../components/AppShell';
import { useAuth } from '../context/AuthContext';
import styles from './Profile.module.css';

export default function Profile() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  return (
    <AppShell>
      <p className={styles.eyebrow}>Fiche personnelle</p>
      <h1 className={styles.title}>Profil</h1>

      <div className={styles.card}>
        <div className={styles.row}>
          <span className={styles.label}>Nom</span>
          <span className={styles.value}>{user?.name}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{user?.email}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Membre depuis</span>
          <span className={styles.value}>
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : '—'}
          </span>
        </div>
      </div>

      <p className={styles.note}>
        La modification du profil (nom, email, mot de passe) sera disponible dans une prochaine version.
      </p>
    </AppShell>
  );
}
