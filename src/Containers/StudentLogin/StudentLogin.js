import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../Components/Button/Button";

import { adminLogin, studentLogin } from "../../services/auth.service";
import { AuthContext } from "../../utils/Store";

import styles from "./StudentLogin.module.css";

import { ReactComponent as Logo } from "../../assets/images/logo.svg";

const Login = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [mailSent, setMailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState();

  const notify = (message, type) =>
    toast(message, {
      type,
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  const sendEmail = async () => {
    try {
      setIsLoading(true);
      await adminLogin(rollno, password);

      notify("Email Sent!", "success");
      setMailSent(true);
    } catch (err) {
      notify("Email or password incorrect!", "error");
      console.log(err?.response);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const data = await studentLogin(rollno, password);
      auth.setAuth(data.token);
      auth.setType("userToken");
      auth.setRoll(rollno);
      notify("Successfully logged in!", "success");
      history.push("/results");
    } catch (err) {
      notify("Invalid Roll Number or Password!", "error");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Student Login</h2>
      {!mailSent ? (
        <div className={styles.loginContainer}>
          <Logo className={styles.logo} />
          <input
            type="text"
            placeholder="Enter Roll Number"
            className={styles.input}
            value={rollno}
            onChange={({ target: { value } }) => setRollno(value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className={styles.input}
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <Button title="Login" onClick={handleLogin} loading={isLoading} />
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <Logo className={styles.logo} />
          <input
            type="password"
            placeholder="Enter OTP"
            className={styles.input}
            value={otp}
            onChange={({ target: { value } }) => setOtp(value)}
          />
          <Button title="Login" onClick={handleLogin} loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default Login;
