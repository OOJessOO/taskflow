export function getErrorMessage(err, t) {
  const code = err?.response?.data?.code;
  if (code) {
    const key = `errors.${code}`;
    const translated = t(key);
    if (translated !== key) {
      return translated;
    }
  }
  return t('errors.generic');
}
