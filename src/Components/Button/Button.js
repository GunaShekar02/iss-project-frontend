import React from "react";

import styles from "./Button.module.css";

import { ReactComponent as Logo } from "../../assets/images/logo.svg";

const Button = (props) => {
  return (
    <div
      className={`${styles.container} ${props.className} ${
        props.disabled || props.loading ? styles.disabled : null
      }`}
      onClick={props.onClick}
    >
      {props.loading ? <Logo className={styles.logo} /> : props.title}
    </div>
  );
};

export default Button;
