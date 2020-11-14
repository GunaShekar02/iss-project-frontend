import React, { useState, useContext } from "react";
import { toast } from "react-toastify";

import Button from "../../Components/Button/Button";

import styles from "./Issue.module.css";

import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { issueCertificates } from "../../services/certificates.service";
import { uploadResults } from "../../services/results.service";

import { AuthContext } from "../../utils/Store";

const Upload = () => {
  const { auth } = useContext(AuthContext);

  const [err, setErr] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState();
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

  const handleUpload = async () => {
    try {
      setIsLoading(true);
      const data = await uploadResults(file, sem, auth);
      console.log(data);
      setIsLoading(false);
      notify("Results successfully uploaded!", "success");
    } catch (err) {
      setIsLoading(false);
      notify(
        err?.response?.data.message ||
          "Some error has occurred, please try again later!",
        "error"
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Upload Results</h2>
      <div className={styles.issueContainer}>
        <Logo className={styles.logo} />
        <label>
          Upload a csv file containing the student results
          <input
            type="file"
            className={styles.input}
            onChange={({ target: { files } }) => setFile(files[0])}
          />
        </label>
        <input
          type="text"
          placeholder="Enter Semester Number"
          className={styles.input}
          value={sem}
          onChange={({ target: { value } }) => setSem(value)}
        />
        <Button title="Upload" onClick={handleUpload} loading={isLoading} />
      </div>
    </div>
  );
};

export default Upload;
