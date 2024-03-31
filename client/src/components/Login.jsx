import { useEffect, useState } from "react";
import { loginSchema } from "../utils";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import Axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Login = () => {
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleFormSubmit = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };

    await Axios.post("https://todo-webapp-server.vercel.app/api/auth", user)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        window.location = "/";
      })
      .catch((error) => {
        console.log("Error submitting form", error);
        if (error.response.status == 400 || error.response.status == 500)
          setServerError(error.response.data);
        else setServerError("An Unknown Error Occured");
      });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.windowContainer}>
        <div className={styles.introContainer}>
          <h1>Stay Organized, Anywhere, Anytime</h1>
          <img src="/images/login-intro.png" alt="" />
        </div>
        <div className={styles.loginContainer}>
          <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <div className={styles.welcomeText}>
              <h2>Welcome Back!</h2>
              <h2>Login to Your Account</h2>
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                {...register("email")}
              />
              <div className={styles.error}>
                <p>{errors.email?.message}</p>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                {...register("password")}
              />
              <div className={styles.error}>
                <p>{errors.password?.message}</p>
              </div>
            </div>
            <button className={styles.loginBtn}>Login</button>
          </form>
          <div className={styles.serverError}>
            <p>{serverError && serverError}</p>
          </div>
          <Link to="/signup" className={styles.signInRequest}>
            Don't Have an Account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
