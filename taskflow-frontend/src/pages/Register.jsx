import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { getErrorMessage } from '../utils/errorMessage';
import FormField from '../components/FormField';
import styles from './AuthPages.module.css';

export default function Register() {
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await register(form);
      navigate('/tableau-de-bord');
    } catch (err) {
      setError(getErrorMessage(err, t));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>{t('auth.registerEyebrow')}</p>
        <h1 className={styles.title}>{t('auth.registerTitle')}</h1>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <FormField
            label={t('auth.name')}
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />
          <FormField
            label={t('common.email')}
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <FormField
            label={t('common.password')}
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            minLength={6}
            required
          />
          <button type="submit" className={styles.submit} disabled={isSubmitting}>
            {isSubmitting ? t('auth.registerSubmitting') : t('auth.registerSubmit')}
          </button>
        </form>

        <p className={styles.switch}>
          {t('auth.registerHasAccount')} <Link to="/connexion">{t('nav.login')}</Link>
        </p>
      </div>
    </div>
  );
}
