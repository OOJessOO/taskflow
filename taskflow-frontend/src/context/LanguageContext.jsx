import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import fr from '../i18n/locales/fr';
import en from '../i18n/locales/en';

const translations = { fr, en };
const DEFAULT_LANG = 'fr';
const STORAGE_KEY = 'taskflow_lang';

const LanguageContext = createContext(null);

function resolve(obj, key) {
  return key
    .split('.')
    .reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return translations[stored] ? stored : DEFAULT_LANG;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const t = useCallback(
    (key, params) => {
      const template = resolve(translations[lang], key) ?? resolve(translations.fr, key) ?? key;
      if (!params) return template;
      return template.replace(/\{(\w+)\}/g, (match, name) =>
        params[name] !== undefined ? params[name] : match
      );
    },
    [lang]
  );

  const formatDate = useCallback(
    (dateString, options = {}) => {
      if (!dateString) return '—';
      const locale = lang === 'en' ? 'en-US' : 'fr-FR';
      return new Date(dateString).toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        ...options,
      });
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t, formatDate }), [lang, setLang, t, formatDate]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage doit être utilisé à l\'intérieur d\'un LanguageProvider.');
  }
  return context;
}
