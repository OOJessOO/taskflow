import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import styles from './NotFound.module.css';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className={styles.page}>
      <p className={styles.stamp}>{t('notFound.stamp')}</p>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>
        {t('notFound.message')}
      </p>
      <Link to="/" className={styles.link}>{t('notFound.home')}</Link>
    </div>
  );
}
