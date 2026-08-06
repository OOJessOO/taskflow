import { resolveAvatarUrl } from '../utils/avatar';
import { useLanguage } from '../context/LanguageContext';
import styles from './Avatar.module.css';

function getInitials(name = '') {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Avatar({ user, size = 40 }) {
  const { t } = useLanguage();
  const src = resolveAvatarUrl(user?.avatarUrl);
  const style = { width: size, height: size, fontSize: size * 0.4 };

  if (src) {
    return (
      <img
        src={src}
        alt={t('avatar.alt', { name: user?.name || 'user' })}
        className={styles.avatar}
        style={style}
      />
    );
  }

  return (
    <div className={styles.avatarFallback} style={style}>
      {getInitials(user?.name)}
    </div>
  );
}
