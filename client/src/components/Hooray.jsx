import styles from "./Hooray.module.css";

export const Hooray = () => {
  return (
    <div className={styles.hooray}>
      <img src="/images/no-tasks.png" alt="happy man image" />
      <p>Hooray! No Tasks</p>
    </div>
  );
};
