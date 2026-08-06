const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');

export function resolveAvatarUrl(avatarUrl) {
  if (!avatarUrl) return null;
  return `${API_ORIGIN}${avatarUrl}`;
}