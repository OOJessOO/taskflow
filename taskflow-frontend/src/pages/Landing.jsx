import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import styles from './Landing.module.css';

export default function Landing() {
  const { t } = useLanguage();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.brandMark}>TF</span>
        <nav className={styles.headerNav}>
          <LanguageToggle />
          <Link to="/connexion" className={styles.navLink}>{t('nav.login')}</Link>
          <Link to="/inscription" className={styles.ctaLink}>{t('landing.openRegister')}</Link>
        </nav>
      </header>

      <section className={styles.hero}>
  <p className={styles.eyebrow}>{t('landing.eyebrow')}</p>
  <h1 className={styles.title}>
    {t('landing.title1')}<br />{t('landing.title2')}
  </h1>
  <p className={styles.subtitle}>
    {t('landing.subtitle1')}<br />
    {t('landing.subtitle2')}
  </p>
  <Link to="/inscription" className={styles.heroButton}>{t('landing.openMyRegister')}</Link>
</section>

      <section className={styles.ledgerPreview} aria-hidden="true">
        <div className={styles.previewRow}>
          <span className={styles.previewCheck} />
          <span className={styles.previewTitle}>{t('landing.preview1')}</span>
          <span className={styles.previewStamp} data-priority="high">{t('priority.highStamp')}</span>
        </div>
        <div className={styles.previewRow}>
          <span className={styles.previewCheck} data-checked="true">✓</span>
          <span className={styles.previewTitle} data-done="true">{t('landing.preview2')}</span>
          <span className={styles.previewStamp} data-priority="low">{t('priority.lowStamp')}</span>
        </div>
        <div className={styles.previewRow}>
          <span className={styles.previewCheck} />
          <span className={styles.previewTitle}>{t('landing.preview3')}</span>
          <span className={styles.previewStamp} data-priority="medium">{t('priority.mediumStamp')}</span>
        </div>
      </section>

 <footer className={styles.footer}>
  <p className={styles.tagline}>{t('landing.tagline')}</p>
  <p className={styles.signature}>
    © Andriamampionona Fenohery RAZANAJATOVO <span className={styles.handle}>(OOJessOO)</span>
  </p>
</footer>
    </div>
  );
}
