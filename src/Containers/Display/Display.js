import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../Components/Button/Button";

import { adminLogin, verifyAdmin } from "../../services/auth.service";
import { AuthContext } from "../../utils/Store";

import styles from "./Display.module.css";

import { ReactComponent as Logo } from "../../assets/images/logo.svg";

const Display = () => {
  const location = useLocation();
  const history = useHistory();

  const [resultObject, setResultObject] = useState({});

  useEffect(() => {
    const result = location.state?.result;
    if (!result) history.push("/results");
    const parsedResult = JSON.parse(result);
    delete parsedResult.name;
    delete parsedResult.Rollno;

    setResultObject(parsedResult);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Results</h2>

      <div className={styles.loginContainer}>
        <Logo className={styles.logo} />
        {Object.keys(resultObject).map((subject) => (
          <p className={styles.input}>
            {subject} : {resultObject[subject]}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Display;
