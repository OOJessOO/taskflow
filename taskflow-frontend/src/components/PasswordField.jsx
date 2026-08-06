import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function PasswordField({ label, id, ...inputProps }) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
    <label htmlFor={id} style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', letterSpacing: '0.06em', color: 'var(--color-ink-soft)' }}>
  {label}
</label>
      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--color-rule)', borderRadius: 'var(--radius-sm)', background: 'var(--color-paper)', padding: '0 0.75rem' }}>
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          style={{ flex: 1, border: 'none', background: 'transparent', padding: '0.75rem 0', fontSize: '1rem', color: 'var(--color-ink)', minWidth: 0, outline: 'none' }}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? t('passwordField.hide') : t('passwordField.show')}
          style={{ background: 'none', border: 'none', color: 'var(--color-ink-soft)', cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', padding: '0.25rem' }}
        >
          {visible ? t('passwordField.hideLabel') : t('passwordField.showLabel')}
        </button>
      </div>
    </div>
  );
}
