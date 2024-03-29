// Login.jsx
import React, { useState } from "react";
import styles from "./Login.module.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginPage, setLoginPage] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.token);
        localStorage.setItem("token", result.token);
        navigate("/");
        setLoginPage(false);
        console.log("Login successful!");
      } else {
        console.log("Login failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    loginPage && (
      <form className={styles["form-container"]} onSubmit={handleSubmit}>
        <label className={styles.label}>
          email:
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label className={styles.label}>
          Password:
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    )
  );
};

export default Login;
