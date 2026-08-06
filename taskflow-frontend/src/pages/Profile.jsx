import AppShell from '../components/AppShell';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getErrorMessage } from '../utils/errorMessage';
import styles from './Profile.module.css';
import { useState, useRef } from 'react';
import { uploadAvatar, updateProfile } from '../services/userService';
import Avatar from '../components/Avatar';
import PasswordField from '../components/PasswordField';

export default function Profile() {
  const { user, setUser } = useAuth();
  const { t } = useLanguage();
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
      setUploadError(getErrorMessage(err, t));
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
      setSaveError(getErrorMessage(err, t));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <AppShell>
      <div className={styles.page}>
        <p className={styles.eyebrow}>{t('profile.eyebrow')}</p>
        <h1 className={styles.title}>{t('profile.title')}</h1>

        <div className={styles.avatarSection}>
          <Avatar user={user} size={200} />
          <div>
            <button
              type="button"
              className={styles.avatarButton}
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? t('profile.uploading') : t('profile.changePhoto')}
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
              <span className={styles.label}>{t('auth.name')}</span>
              <span className={styles.value}>{user?.name}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>{t('common.email')}</span>
              <span className={styles.value}>{user?.email}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>{t('profile.memberSince')}</span>
              <span className={styles.value}>
                {user?.createdAt ? new Date(user.createdAt).getFullYear() : '—'}
              </span>
            </div>

            {saveSuccess && <p className={styles.success}>{t('profile.saveSuccess')}</p>}

            <button type="button" className={styles.editButton} onClick={startEditing}>
              {t('profile.editButton')}
            </button>
          </div>
        )}

        {isEditing && (
          <form className={styles.card} onSubmit={handleSaveProfile}>
            {saveError && <p className={styles.avatarError}>{saveError}</p>}

            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>{t('auth.name')}</label>
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
              <label htmlFor="email" className={styles.label}>{t('common.email')}</label>
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
              label={t('profile.newPassword')}
              id="password"
              name="password"
              value={form.password}
              onChange={handleFormChange}
              autoComplete="new-password"
              minLength={6}
            />

            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton} onClick={cancelEditing}>
                {t('profile.cancel')}
              </button>
              <button type="submit" className={styles.saveButton} disabled={isSaving}>
                {isSaving ? t('profile.saving') : t('profile.save')}
              </button>
            </div>
          </form>
        )}
      </div>
    </AppShell>
  );
}