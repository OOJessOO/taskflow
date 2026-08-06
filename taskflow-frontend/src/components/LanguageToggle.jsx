import { useLanguage } from '../context/LanguageContext';
import styles from './LanguageToggle.module.css';

export default function LanguageToggle({ variant = 'light', className = '' }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className={`${styles.toggle} ${styles[variant]} ${className}`} role="group" aria-label={t('language.toggleLabel')}>
      <button
        type="button"
        className={`${styles.option} ${lang === 'fr' ? styles.active : ''}`}
        onClick={() => setLang('fr')}
        aria-pressed={lang === 'fr'}
      >
        FR
      </button>
      <button
        type="button"
        className={`${styles.option} ${lang === 'en' ? styles.active : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  );
}
