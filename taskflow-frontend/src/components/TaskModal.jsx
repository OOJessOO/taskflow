import { useState } from 'react';
import FormField from './FormField';
import { useLanguage } from '../context/LanguageContext';
import styles from './TaskModal.module.css';

export default function TaskModal({ task, onClose, onSave, onDelete }) {
  const { t } = useLanguage();
  const isEditing = Boolean(task?.id);

  const [form, setForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate ? task.dueDate.slice(0, 10) : '',
    priority: task?.priority || 'medium',
    status: task?.status || 'todo',
  });
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(form);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{isEditing ? t('taskModal.editing') : t('taskModal.creating')}</p>
          <button className={styles.closeButton} onClick={onClose} aria-label={t('taskModal.close')}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <FormField
            label={t('taskModal.title')}
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            autoFocus
          />

          <div className={styles.field}>
            <label htmlFor="description" className={styles.label}>{t('taskModal.description')}</label>
            <textarea
              id="description"
              name="description"
              className={styles.textarea}
              rows={3}
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className={styles.row}>
            <FormField
              label={t('taskModal.dueDate')}
              id="dueDate"
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
            />

            <div className={styles.field}>
              <label htmlFor="priority" className={styles.label}>{t('taskModal.priority')}</label>
              <select id="priority" name="priority" className={styles.select} value={form.priority} onChange={handleChange}>
                <option value="low">{t('priority.low')}</option>
                <option value="medium">{t('priority.medium')}</option>
                <option value="high">{t('priority.high')}</option>
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="status" className={styles.label}>{t('taskModal.status')}</label>
            <select id="status" name="status" className={styles.select} value={form.status} onChange={handleChange}>
              <option value="todo">{t('status.todo')}</option>
              <option value="in_progress">{t('status.in_progress')}</option>
              <option value="done">{t('status.done')}</option>
            </select>
          </div>

          <div className={styles.actions}>
            {onDelete && (
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => onDelete(task.id)}
              >
                {t('taskModal.delete')}
              </button>
            )}
            <button type="submit" className={styles.saveButton} disabled={isSaving}>
              {isSaving ? t('taskModal.saving') : t('taskModal.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
