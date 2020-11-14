import React, { useState } from "react";
import { toast } from "react-toastify";

import Button from "../../Components/Button/Button";

import styles from "./Register.module.css";

import { ReactComponent as Logo } from "../../assets/images/logo.svg";

import { register, verify } from "../../services/auth.service";

const NodeRSA = require("node-rsa");

const Find = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [mailSent, setMailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState();

  const download = (filename, text) => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const generateKeyPair = () => {
    const key = new NodeRSA({ b: 512 });
    const publicKey = key.exportKey("public");
    const privateKey = key.exportKey("private");

    return { publicKey, privateKey };
  };

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
      const data = await register(roll, password);
      if (data.token) setToken(data?.token);
      else
        throw {
          message:
            "The backend is stupid to not send an error here so I have to do it on my own.",
        };
      notify("Email Sent!", "success");
      setMailSent(true);
    } catch (err) {
      notify("Please try again later!", "error");
      console.log(err?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      const { publicKey, privateKey } = generateKeyPair();

      await verify(otp, publicKey, token);

      notify("Successfully registered, you may login now!", "success");

      download("private_key.txt", privateKey);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      {!mailSent ? (
        <div className={styles.loginContainer}>
          <Logo className={styles.logo} />
          <input
            type="text"
            placeholder="Enter Roll Number"
            className={styles.input}
            value={roll}
            onChange={({ target: { value } }) => setRoll(value)}
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
          <Button
            title="Register"
            onClick={handleRegister}
            loading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default Find;
