import StampBadge from './StampBadge';
import styles from './LedgerRow.module.css';

const STATUS_LABELS = {
  todo: 'À faire',
  in_progress: 'En cours',
  done: 'Terminé',
};

function formatDate(dateString) {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function LedgerRow({ task, onOpen, onToggleStatus }) {
  const isDone = task.status === 'done';

  return (
    <div className={`${styles.row} ${isDone ? styles.done : ''}`}>
      <button
        className={styles.checkbox}
        onClick={() => onToggleStatus(task)}
        aria-label={isDone ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
      >
        {isDone ? '✓' : ''}
      </button>

      <button className={styles.title} onClick={() => onOpen(task)}>
        {task.title}
      </button>

      <span className={styles.status}>{STATUS_LABELS[task.status]}</span>

      <span className={styles.date}>{formatDate(task.dueDate)}</span>

      <StampBadge priority={task.priority} />
    </div>
  );
}
