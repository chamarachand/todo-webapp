import styles from "./Task.module.css";
import { AiFillDelete as DeleteIcon } from "react-icons/ai";
import { BiSolidCheckCircle as DoneIcon } from "react-icons/bi";

export const Task = (props) => {
  return (
    <div className={`${styles.task} ${props.task.completed && styles.isDone}`}>
      <img src="/images/checking.png" alt="" style={{ width: "40px" }} />
      <p className={styles.taskName}>{props.task.taskName}</p>
      <div className={styles.buttons}>
        <DoneIcon
          className={styles.doneIcon}
          onClick={() => props.updateTask(props.task._id)}
        />
        <DeleteIcon
          className={styles.deleteIcon}
          onClick={() => props.deleteTask(props.task._id)}
        />
      </div>
    </div>
  );
};
