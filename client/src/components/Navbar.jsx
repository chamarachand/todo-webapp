import { AppContext } from "../App";
import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import styles from "./Navbar.module.css";

export const Navbar = ({ userData }) => {
  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <h3>Stay Organized, Anywhere, Anytime</h3>
        <div>
          <p className={styles.greetUser}>
            Hi! {userData ? userData.firstName : " "}
          </p>
        </div>
        <button
          className={styles.logoutBtn}
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Logout
        </button>
      </nav>
    </div>
  );
};
