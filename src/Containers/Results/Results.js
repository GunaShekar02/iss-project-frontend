import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../Components/Button/Button";

import styles from "./Results.module.css";

import { ReactComponent as Logo } from "../../assets/images/logo.svg";

import { fetchResults } from "../../services/results.service";

const NodeRSA = require("node-rsa");

const Results = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [privateKey, setPrivateKey] = useState();
  const [rollno, setRollno] = useState();
  const [sem, setSem] = useState();

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

  const onChange = (event) => {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  };

  const onReaderLoad = (event) => {
    setPrivateKey(event.target.result);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const data = await fetchResults(
        rollno,
        sem,
        sessionStorage.getItem("token")
      );
      console.log(data);
      setIsLoading(false);

      const private_key = new NodeRSA(privateKey);

      const decryptedResult = private_key.decrypt(data, "utf8");

      history.push("/display", { result: decryptedResult });
    } catch (err) {
      setIsLoading(false);
      notify("Something went wrong!", "error");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Check Your Results</h2>
      <div className={styles.verifyContainer}>
        <Logo className={styles.logo} />
        <input
          type="text"
          placeholder="Enter Roll Number"
          className={styles.input}
          value={rollno}
          onChange={({ target: { value } }) => setRollno(value)}
        />
        <input
          type="text"
          placeholder="Enter Semester Number"
          className={styles.input}
          value={sem}
          onChange={({ target: { value } }) => setSem(value)}
        />
        <label>
          Upload your private key(This won't be sent to the server)
          <input type="file" className={styles.input} onChange={onChange} />
        </label>
        <Button
          title="Get Results"
          loading={isLoading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Results;
