import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Button from "../../Components/Button/Button";

import { login } from "../../services/auth.service";
import { AuthContext } from "../../utils/Store";

import styles from "./Login.module.css";

import { ReactComponent as Logo } from "../../assets/images/logo.svg";

const Login = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [apiKey, setApiKey] = useState("");

  const handleLogin = async () => {
    try {
      await login(apiKey);
      auth[1](apiKey);
      history.push("/issue");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Authorize</h2>
      <div className={styles.loginContainer}>
        <Logo className={styles.logo} />
        <input
          type="password"
          placeholder="Enter API Key"
          className={styles.input}
          value={apiKey}
          onChange={({ target: { value } }) => setApiKey(value)}
        />
        <Button title="Login" onClick={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
