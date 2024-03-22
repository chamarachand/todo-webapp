import styles from "./Input.module.css";

export const Input = ({ label, type, id, placeholder, register, error }) => {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputField}>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          {...register(id)}
        />
        <div className={styles.error}>
          <p>{error?.message}</p>
        </div>
      </div>
    </div>
  );
};
