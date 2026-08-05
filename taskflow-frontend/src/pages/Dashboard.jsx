import { useEffect, useState, useMemo } from 'react';
import AppShell from '../components/AppShell';
import LedgerRow from '../components/LedgerRow';
import TaskModal from '../components/TaskModal';
import { useTasks } from '../context/TasksContext';
import styles from './Dashboard.module.css';

const STATUS_FILTERS = [
  { value: '', label: 'Toutes' },
  { value: 'todo', label: 'À faire' },
  { value: 'in_progress', label: 'En cours' },
  { value: 'done', label: 'Terminées' },
];

export default function Dashboard() {
  const { lists, tasks, isLoading, loadAll, addList, addTask, editTask, removeTask } = useTasks();
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
          <p className={styles.eyebrow}>Registre du jour</p>
          <h1 className={styles.title}>Tableau de bord</h1>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Colonne "intercalaires" : les listes */}
        <div className={styles.tabs}>
          {lists.map((list) => (
            <button
              key={list.id}
              className={`${styles.tab} ${activeListId === list.id ? styles.tabActive : ''}`}
              onClick={() => setActiveListId(list.id)}
            >
              {list.title}
            </button>
          ))}

          <form onSubmit={handleAddList} className={styles.newListForm}>
            <input
              className={styles.newListInput}
              placeholder="+ Nouvelle liste"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
            />
          </form>
        </div>

        <div className={styles.ledgerPanel}>
          <div className={styles.toolbar}>
            <input
              className={styles.search}
              placeholder="Rechercher une tâche..."
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
              + Ajouter une tâche
            </button>
          </div>

          <div className={styles.ledger}>
            {isLoading && <p className={styles.emptyState}>Chargement du registre...</p>}

            {!isLoading && lists.length === 0 && (
              <p className={styles.emptyState}>
                Aucune liste pour l'instant. Crée ta première liste à gauche pour commencer.
              </p>
            )}

            {!isLoading && lists.length > 0 && filteredTasks.length === 0 && (
              <p className={styles.emptyState}>
                Rien ici. Ajoute une tâche pour ouvrir cette page du registre.
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
