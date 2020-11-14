import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../Components/Button/Button";

import { adminLogin, verifyAdmin } from "../../services/auth.service";
import { AuthContext } from "../../utils/Store";

import styles from "./Login.module.css";

import { ReactComponent as Logo } from "../../assets/images/logo.svg";

const Login = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
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
      await adminLogin(email, password);

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
      const data = await verifyAdmin(otp);
      auth.setAuth(data.token);
      auth.setType("adminToken");
      notify("Successfully logged in!", "success");
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Admin Login</h2>
      {!mailSent ? (
        <div className={styles.loginContainer}>
          <Logo className={styles.logo} />
          <input
            type="text"
            placeholder="Enter Email"
            className={styles.input}
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className={styles.input}
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <Button title="Get OTP" onClick={sendEmail} loading={isLoading} />
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
