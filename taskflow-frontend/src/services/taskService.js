import api from './api';

export async function fetchTasks(filters = {}) {
  const { data } = await api.get('/tasks', { params: filters });
  return data.tasks;
}

export async function createTask(task) {
  const { data } = await api.post('/tasks', task);
  return data.task;
}

export async function updateTask(id, updates) {
  const { data } = await api.put(`/tasks/${id}`, updates);
  return data.task;
}

export async function deleteTask(id) {
  await api.delete(`/tasks/${id}`);
}
