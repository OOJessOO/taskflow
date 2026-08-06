import api from './api';

export async function uploadAvatar(file) {
  const formData = new FormData();
  formData.append('avatar', file);

  const { data } = await api.put('/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.avatarUrl;
}
export async function updateProfile(payload) {
  const { data } = await api.put('/users/me', payload);
  return data.user;
}