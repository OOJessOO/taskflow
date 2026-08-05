import { useState } from 'react';
import FormField from './FormField';
import styles from './TaskModal.module.css';

export default function TaskModal({ task, onClose, onSave, onDelete }) {
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
          <p className={styles.eyebrow}>{isEditing ? 'Fiche existante' : 'Nouvelle fiche'}</p>
          <button className={styles.closeButton} onClick={onClose} aria-label="Fermer">✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <FormField
            label="Titre"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            autoFocus
          />

          <div className={styles.field}>
            <label htmlFor="description" className={styles.label}>Description</label>
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
              label="Échéance"
              id="dueDate"
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
            />

            <div className={styles.field}>
              <label htmlFor="priority" className={styles.label}>Priorité</label>
              <select id="priority" name="priority" className={styles.select} value={form.priority} onChange={handleChange}>
                <option value="low">Léger</option>
                <option value="medium">Moyen</option>
                <option value="high">Urgent</option>
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="status" className={styles.label}>Statut</label>
            <select id="status" name="status" className={styles.select} value={form.status} onChange={handleChange}>
              <option value="todo">À faire</option>
              <option value="in_progress">En cours</option>
              <option value="done">Terminé</option>
            </select>
          </div>

          <div className={styles.actions}>
            {onDelete && (
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => onDelete(task.id)}
              >
                Supprimer
              </button>
            )}
            <button type="submit" className={styles.saveButton} disabled={isSaving}>
              {isSaving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
