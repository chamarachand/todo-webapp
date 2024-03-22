import { useState, useContext } from "react";
import { AppContext } from "../App";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "./Navbar";
import { Task } from "./Task";
import { Hooray } from "./Hooray";
import styles from "./Home.module.css";
import Axios from "axios";

export const Home = () => {
  const [task, setTask] = useState("");
  const { token } = useContext(AppContext);

  const {
    data: userData,
    isLoading: userIsLoading,
    refetch: refetchUser,
  } = useQuery(["user"], () => {
    return Axios.get("http://localhost:3000/api/users/me", {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => res.data)
      .catch((error) => console.error("Error fetching username", error));
  });

  const {
    data: toDoList,
    isLoading: taskIsLoading,
    refetch: refetchTasks,
  } = useQuery(["task"], () => {
    // may add try catch
    return Axios.get("http://localhost:3000/api/tasks/me", {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => res.data)
      .catch((error) => console.error("Error fetching tasks", error));
  });

  const addTask = async () => {
    if (task) {
      const newTask = {
        user: userData._id,
        taskName: task,
        completed: false,
      };

      Axios.post("http://localhost:3000/api/tasks", newTask).then((res) => {
        console.log("Task added successfully", res.data);
        refetchTasks();
      });

      setTask("");
    }
  };

  const deleteTask = (id) => {
    Axios.delete(`http://localhost:3000/api/tasks/${id}`).then((res) => {
      console.log("Delete Successful", res.data);
      refetchTasks();
    });
  };

  const deleteAll = () => {
    Axios.delete("http://localhost:3000/api/tasks").then((res) => {
      console.log(res.data);
      refetchTasks();
    });
  };

  const updateTask = (id) => {
    Axios.patch(`http://localhost:3000/api/tasks/${id}`).then((res) => {
      console.log("Updated Successfully", res.data);
      refetchTasks();
    });
  };

  if (taskIsLoading) return <p>Loading</p>;

  return (
    <div className={styles.mainContainer}>
      <Navbar userData={userData} />

      <header className={styles.header}>
        <img src="/images/completed-task.png" alt="Image of a completed task" />
        <h1>To Do List</h1>
      </header>

      <div className={styles.controllers}>
        <input
          className={styles.input}
          type="text"
          placeholder="Add Your Task.."
          onChange={(event) => setTask(event.target.value)}
          value={task}
        />
        <button className={styles.controllerBtn} onClick={addTask}>
          Add
        </button>
        <button className={styles.controllerBtn} onClick={deleteAll}>
          Clear
        </button>
      </div>

      <div className={styles.list}>
        {!toDoList || toDoList.length === 0 ? (
          <Hooray />
        ) : (
          toDoList.map((task) => {
            return (
              <Task
                key={task._id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
