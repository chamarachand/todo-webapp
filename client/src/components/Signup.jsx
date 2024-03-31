import { useState } from "react";
import { signupSchema } from "../utils";
import { Link } from "react-router-dom";
import { Input } from "./Input";
import styles from "./Signup.module.css";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const Signup = () => {
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const handleFormSubmit = async (data) => {
    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    await Axios.post("https://todo-webapp-server.vercel.app/api/users", user)
      .then((res) => {
        // alert("Registered Successfully");
        window.location = "/login";
      })
      .catch((error) => {
        console.log("Error submitting form", error);
        if (
          error.response &&
          (error.response.status == 400 || error.response.status == 500)
        )
          setServerError(error.response.data);
        else setServerError("An Unknown Error Occured");
      });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.windowContainer}>
        <div className={styles.introContainer}>
          <h1>Stay Organized, Anywhere, Anytime</h1>
          <img src="/images/signup-intro.png" alt="" />
        </div>
        <div className={styles.signupContainer}>
          <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <div className={styles.welcomeText}>
              <h2>New Here? Let's Get Started</h2>
              {/* <h2>Let's Get Started</h2> */}
            </div>

            <Input
              label="First Name"
              type="text"
              id="firstName"
              placeholder="John"
              register={register}
              error={errors.firstName}
            />

            <Input
              label="Last Name"
              type="text"
              id="lastName"
              placeholder="Smith"
              register={register}
              error={errors.lastName}
            />

            <Input
              label="Email"
              type="email"
              id="email"
              placeholder="johnsmith@abc.com"
              register={register}
              error={errors.email}
            />

            <Input
              label="Password"
              type="password"
              id="password"
              placeholder="*****"
              register={register}
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              placeholder="*****"
              register={register}
              error={errors.confirmPassword}
            />

            <button className={styles.registerBtn}>Register</button>
          </form>
          <div className={styles.serverError}>
            <p>{serverError && serverError}</p>
          </div>
          <Link to="/login" className={styles.signUpRequest}>
            Already Have an Account? Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
