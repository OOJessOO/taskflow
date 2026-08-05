import styles from './StampBadge.module.css';

const LABELS = {
  low: 'LÉGER',
  medium: 'MOYEN',
  high: 'URGENT',
};

/**
 * Élément signature du design : badge de priorité façon tampon encreur.
 * Le contour irrégulier vient d'un filtre SVG (turbulence) appliqué en clip-path,
 * pas d'une image — reproduit numériquement l'imperfection d'un vrai tampon.
 */
export default function StampBadge({ priority = 'medium' }) {
  return (
    <span className={`${styles.stamp} ${styles[priority]}`} role="status" aria-label={`Priorité : ${LABELS[priority]}`}>
      {LABELS[priority]}
    </span>
  );
}
