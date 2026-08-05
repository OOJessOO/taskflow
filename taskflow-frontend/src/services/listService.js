import api from './api';

export async function fetchLists() {
  const { data } = await api.get('/lists');
  return data.lists;
}

export async function createList(title) {
  const { data } = await api.post('/lists', { title });
  return data.list;
}

export async function updateList(id, title) {
  const { data } = await api.put(`/lists/${id}`, { title });
  return data.list;
}

export async function deleteList(id) {
  await api.delete(`/lists/${id}`);
}
