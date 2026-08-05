import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

export default function Landing() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.brandMark}>TF</span>
        <nav className={styles.headerNav}>
          <Link to="/connexion" className={styles.navLink}>Se connecter</Link>
          <Link to="/inscription" className={styles.ctaLink}>Ouvrir un registre</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Vol. 01 — Édition personnelle</p>
        <h1 className={styles.title}>
          Tenez le registre<br />de ce qui compte vraiment.
        </h1>
        <p className={styles.subtitle}>
          TaskFlow n'est pas un tableau de plus. C'est un carnet de bord :
          chaque tâche a sa ligne, chaque priorité son tampon, chaque jour sa page.
        </p>
        <Link to="/inscription" className={styles.heroButton}>Commencer mon registre →</Link>
      </section>

      <section className={styles.ledgerPreview} aria-hidden="true">
        <div className={styles.previewRow}>
          <span className={styles.previewCheck} />
          <span className={styles.previewTitle}>Préparer la présentation client</span>
          <span className={styles.previewStamp} data-priority="high">URGENT</span>
        </div>
        <div className={styles.previewRow}>
          <span className={styles.previewCheck} data-checked="true">✓</span>
          <span className={styles.previewTitle} data-done="true">Relire le contrat de bail</span>
          <span className={styles.previewStamp} data-priority="low">LÉGER</span>
        </div>
        <div className={styles.previewRow}>
          <span className={styles.previewCheck} />
          <span className={styles.previewTitle}>Réserver les billets de train</span>
          <span className={styles.previewStamp} data-priority="medium">MOYEN</span>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>TaskFlow — projet personnel, réalisé en React / Node / PostgreSQL.</p>
      </footer>
    </div>
  );
}
