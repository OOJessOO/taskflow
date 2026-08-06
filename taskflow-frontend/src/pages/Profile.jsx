import AppShell from '../components/AppShell';
import { useAuth } from '../context/AuthContext';
import styles from './Profile.module.css';
import { useState, useRef } from 'react';
import { uploadAvatar, updateProfile } from '../services/userService';
import Avatar from '../components/Avatar';
import PasswordField from '../components/PasswordField';

export default function Profile() {
  const { user, setUser } = useAuth();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  async function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploadError('');
    setIsUploading(true);
    try {
      const avatarUrl = await uploadAvatar(file);
      setUser((prev) => ({ ...prev, avatarUrl }));
    } catch (err) {
      setUploadError(err.response?.data?.message || 'Échec de l\'envoi. Réessaie.');
    } finally {
      setIsUploading(false);
    }
  }

  function handleFormChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function startEditing() {
    setForm({ name: user?.name || '', email: user?.email || '', password: '' });
    setSaveError('');
    setSaveSuccess(false);
    setIsEditing(true);
  }

  function cancelEditing() {
    setIsEditing(false);
    setSaveError('');
  }

  async function handleSaveProfile(e) {
    e.preventDefault();
    setSaveError('');
    setIsSaving(true);
    try {
      const payload = { name: form.name, email: form.email };
      if (form.password) {
        payload.password = form.password;
      }
      const updatedUser = await updateProfile(payload);
      setUser((prev) => ({ ...prev, ...updatedUser }));
      setIsEditing(false);
      setSaveSuccess(true);
    } catch (err) {
      setSaveError(err.response?.data?.message || 'Échec de la mise à jour. Réessaie.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AppShell>
      <div className={styles.page}>
        <p className={styles.eyebrow}>Fiche personnelle</p>
        <h1 className={styles.title}>Profil</h1>

        <div className={styles.avatarSection}>
          <Avatar user={user} size={200} />
          <div>
            <button
              type="button"
              className={styles.avatarButton}
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? 'Envoi...' : 'Changer la photo'}
            </button>
            {uploadError && <p className={styles.avatarError}>{uploadError}</p>}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/jpeg,image/png,image/webp"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
        </div>

        {!isEditing && (
          <div className={styles.card}>
            <div className={styles.row}>
              <span className={styles.label}>Nom</span>
              <span className={styles.value}>{user?.name}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Email</span>
              <span className={styles.value}>{user?.email}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Membre depuis</span>
              <span className={styles.value}>
                {user?.createdAt ? new Date(user.createdAt).getFullYear() : '—'}
              </span>
            </div>

            {saveSuccess && <p className={styles.success}>Profil mis à jour avec succès.</p>}

            <button type="button" className={styles.editButton} onClick={startEditing}>
              Modifier mes informations
            </button>
          </div>
        )}

        {isEditing && (
          <form className={styles.card} onSubmit={handleSaveProfile}>
            {saveError && <p className={styles.avatarError}>{saveError}</p>}

            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>Nom</label>
              <input
                id="name"
                name="name"
                className={styles.input}
                value={form.name}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className={styles.input}
                value={form.email}
                onChange={handleFormChange}
                required
              />
            </div>

            <PasswordField
              label="Nouveau mot de passe (laisser vide pour ne pas changer)"
              id="password"
              name="password"
              value={form.password}
              onChange={handleFormChange}
              autoComplete="new-password"
              minLength={6}
            />

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton} onClick={cancelEditing}>
                Annuler
              </button>
              <button type="submit" className={styles.saveButton} disabled={isSaving}>
                {isSaving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        )}
      </div>
    </AppShell>
  );
}