import StampBadge from './StampBadge';
import { useLanguage } from '../context/LanguageContext';
import styles from './LedgerRow.module.css';

export default function LedgerRow({ task, onOpen, onToggleStatus }) {
  const { t, formatDate } = useLanguage();
  const isDone = task.status === 'done';

  return (
    <div className={`${styles.row} ${isDone ? styles.done : ''}`}>
      <button
        className={styles.checkbox}
        onClick={() => onToggleStatus(task)}
        aria-label={isDone ? t('ledger.markUndone') : t('ledger.markDone')}
      >
        {isDone ? '✓' : ''}
      </button>

      <button className={styles.title} onClick={() => onOpen(task)}>
        {task.title}
      </button>

      <span className={styles.status}>{t(`status.${task.status}`)}</span>

      <span className={styles.date}>{formatDate(task.dueDate)}</span>

      <StampBadge priority={task.priority} />
    </div>
  );
}
