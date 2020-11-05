import React, { useState } from "react";
import { toast } from "react-toastify";

import Button from "../../Components/Button/Button";

import styles from "./Register.module.css";

import { ReactComponent as Logo } from "../../assets/images/logo.svg";

const crypto = require("crypto");
const eccrypto = require("eccrypto");

const Find = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [mailSent, setMailSent] = useState(false);
  const [otp, setOtp] = useState("");

  const generateKeyPair = () => {
    const privateKey = eccrypto.generatePrivate();
    console.log(privateKey);
    const publicKey = eccrypto.getPublic(privateKey);
    console.log(publicKey.toJSON());
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
      setIsLoading(false);
      notify("Email Sent!", "success");
      setMailSent(true);
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  const handleRegister = () => {
    try {
      generateKeyPair();
    } catch (err) {
      throw err;
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
            placeholder="Enter Email"
            className={styles.input}
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
          <Button title="Get OTP" onClick={sendEmail} loading={isLoading} />
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <Logo className={styles.logo} />
          <input
            type="text"
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
