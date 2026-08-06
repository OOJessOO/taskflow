import { useLanguage } from '../context/LanguageContext';
import styles from './StampBadge.module.css';

/**
 * Élément signature du design : badge de priorité façon tampon encreur.
 * Le contour irrégulier vient d'un filtre SVG (turbulence) appliqué en clip-path,
 * pas d'une image — reproduit numériquement l'imperfection d'un vrai tampon.
 */
export default function StampBadge({ priority = 'medium' }) {
  const { t } = useLanguage();
  const label = t(`priority.${priority}Stamp`);

  return (
    <span className={`${styles.stamp} ${styles[priority]}`} role="status" aria-label={t('priority.ariaPrefix', { label })}>
      {label}
    </span>
  );
}
