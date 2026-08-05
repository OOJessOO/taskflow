import { createContext, useContext, useState, useCallback } from 'react';
import * as listService from '../services/listService';
import * as taskService from '../services/taskService';

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [listsData, tasksData] = await Promise.all([
        listService.fetchLists(),
        taskService.fetchTasks(),
      ]);
      setLists(listsData);
      setTasks(tasksData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addList = useCallback(async (title) => {
    const list = await listService.createList(title);
    setLists((prev) => [...prev, { ...list, Tasks: [] }]);
    return list;
  }, []);

  const removeList = useCallback(async (id) => {
    await listService.deleteList(id);
    setLists((prev) => prev.filter((l) => l.id !== id));
    setTasks((prev) => prev.filter((t) => t.listId !== id));
  }, []);

  const addTask = useCallback(async (task) => {
    const created = await taskService.createTask(task);
    setTasks((prev) => [created, ...prev]);
    return created;
  }, []);

  const editTask = useCallback(async (id, updates) => {
    const updated = await taskService.updateTask(id, updates);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }, []);

  const removeTask = useCallback(async (id) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <TasksContext.Provider
      value={{ lists, tasks, isLoading, loadAll, addList, removeList, addTask, editTask, removeTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks doit être utilisé à l\'intérieur d\'un TasksProvider.');
  }
  return context;
}
