import styles from './FormField.module.css';

export default function FormField({ label, id, ...inputProps }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input id={id} className={styles.input} {...inputProps} />
    </div>
  );
}
