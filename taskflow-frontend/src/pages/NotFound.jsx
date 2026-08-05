import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <p className={styles.stamp}>PAGE ABSENTE DU REGISTRE</p>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>
        Cette page n'existe pas, ou a été retirée du carnet.
      </p>
      <Link to="/" className={styles.link}>Retour à l'accueil</Link>
    </div>
  );
}
