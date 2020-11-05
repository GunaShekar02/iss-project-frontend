import React, { useState } from "react";

import Button from "../../Components/Button/Button";

import styles from "./Issue.module.css";

import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import { issueCertificates } from "../../services/certificates.service";

const Upload = () => {
  const [issued, setIssued] = useState(false);
  const [err, setErr] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState();

  const handleIssue = async () => {
    try {
      setIsLoading(true);
      await issueCertificates(file);
      setIsLoading(false);
      setIssued(true);
    } catch (err) {
      setIsLoading(false);
      setErr(
        err?.response?.data.message ||
          "Some error has occurred, please try again later!"
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Issue Certificates</h2>
      <div className={styles.issueContainer}>
        <Logo className={styles.logo} />
        <label>
          Upload a csv file containing the student list
          <input
            type="file"
            className={styles.input}
            onChange={({ target: { files } }) => setFile(files[0])}
          />
        </label>
        <Button title="Issue" onClick={handleIssue} loading={isLoading} />
      </div>
      <div className={styles.result}>
        {issued ? `Certificates successfully issued!` : err}
      </div>
    </div>
  );
};

export default Upload;
