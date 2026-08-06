import { useEffect, useState, useMemo } from 'react';
import AppShell from '../components/AppShell';
import LedgerRow from '../components/LedgerRow';
import TaskModal from '../components/TaskModal';
import { useTasks } from '../context/TasksContext';
import { useLanguage } from '../context/LanguageContext';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { lists, tasks, isLoading, loadAll, addList, removeList, addTask, editTask, removeTask } = useTasks();
  const { t } = useLanguage();

  const STATUS_FILTERS = [
    { value: '', label: t('status.all') },
    { value: 'todo', label: t('status.todo') },
    { value: 'in_progress', label: t('status.in_progress') },
    { value: 'done', label: t('status.donePlural') },
  ];
  const [activeListId, setActiveListId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [newListTitle, setNewListTitle] = useState('');
  const [modalTask, setModalTask] = useState(null); // null = fermé, {} = création, {...} = édition
  const [modalListId, setModalListId] = useState(null);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  useEffect(() => {
    if (!activeListId && lists.length > 0) {
      setActiveListId(lists[0].id);
    }
  }, [lists, activeListId]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t) => (activeListId ? t.listId === activeListId : true))
      .filter((t) => (statusFilter ? t.status === statusFilter : true))
      .filter((t) => (search ? t.title.toLowerCase().includes(search.toLowerCase()) : true));
  }, [tasks, activeListId, statusFilter, search]);

  async function handleAddList(e) {
    e.preventDefault();
    if (!newListTitle.trim()) return;
    const list = await addList(newListTitle.trim());
    setNewListTitle('');
    setActiveListId(list.id);
  }
 async function handleDeleteList(e, listId) {
  e.stopPropagation(); // empêche le clic de sélectionner la liste en plus de la supprimer

  const confirmed = window.confirm(t('dashboard.deleteListConfirm'));
  if (!confirmed) return;

  await removeList(listId);

  if (activeListId === listId) {
    setActiveListId(null); // le useEffect existant sélectionnera automatiquement une autre liste
  }
}
  function handleToggleStatus(task) {
    const nextStatus = task.status === 'done' ? 'todo' : 'done';
    editTask(task.id, { status: nextStatus });
  }

  function openNewTaskModal() {
    setModalListId(activeListId);
    setModalTask({});
  }

  function openEditModal(task) {
    setModalListId(task.listId);
    setModalTask(task);
  }

  async function handleSaveTask(payload) {
    if (modalTask?.id) {
      await editTask(modalTask.id, payload);
    } else {
      await addTask({ ...payload, listId: modalListId });
    }
    setModalTask(null);
  }

  async function handleDeleteTask(id) {
    await removeTask(id);
    setModalTask(null);
  }

  return (
    <AppShell>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{t('dashboard.eyebrow')}</p>
          <h1 className={styles.title}>{t('dashboard.title')}</h1>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Colonne "intercalaires" : les listes */}
        <div className={styles.tabs}>
          {lists.map((list) => (
  <div key={list.id} className={styles.tabWrapper}>
    <button
      className={`${styles.tab} ${activeListId === list.id ? styles.tabActive : ''}`}
      onClick={() => setActiveListId(list.id)}
    >
      {list.title}
    </button>
    <button
      className={styles.tabDelete}
      onClick={(e) => handleDeleteList(e, list.id)}
      aria-label={t('dashboard.deleteListAria', { title: list.title })}
    >
      ✕
    </button>
  </div>
))}

          <form onSubmit={handleAddList} className={styles.newListForm}>
            <input
              className={styles.newListInput}
              placeholder={t('dashboard.newListPlaceholder')}
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
            />
          </form>
        </div>

        <div className={styles.ledgerPanel}>
          <div className={styles.toolbar}>
            <input
              className={styles.search}
              placeholder={t('dashboard.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className={styles.filter}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {STATUS_FILTERS.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
            <button
              className={styles.addTaskButton}
              onClick={openNewTaskModal}
              disabled={!activeListId}
            >
              {t('dashboard.addTask')}
            </button>
          </div>

          <div className={styles.ledger}>
            {isLoading && <p className={styles.emptyState}>{t('dashboard.loading')}</p>}

            {!isLoading && lists.length === 0 && (
              <p className={styles.emptyState}>
                {t('dashboard.noLists')}
              </p>
            )}

            {!isLoading && lists.length > 0 && filteredTasks.length === 0 && (
              <p className={styles.emptyState}>
                {t('dashboard.empty')}
              </p>
            )}

            {filteredTasks.map((task) => (
              <LedgerRow
                key={task.id}
                task={task}
                onOpen={openEditModal}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        </div>
      </div>

      {modalTask !== null && (
        <TaskModal
          task={modalTask}
          onClose={() => setModalTask(null)}
          onSave={handleSaveTask}
          onDelete={modalTask.id ? handleDeleteTask : null}
        />
      )}
    </AppShell>
  );
}
