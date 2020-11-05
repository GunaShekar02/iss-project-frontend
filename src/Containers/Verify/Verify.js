import React, { useState } from "react";

import Button from "../../Components/Button/Button";

import styles from "./Verify.module.css";

import { ReactComponent as Logo } from "../../assets/images/logo.svg";

import { verifyCertificate } from "../../services/certificates.service";

const Verify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [certificateData, setCertificateData] = useState();
  const [verified, setVerified] = useState(false);
  const [err, setErr] = useState();

  const onChange = (event) => {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
  };

  const onReaderLoad = (event) => {
    const obj = JSON.parse(event.target.result);
    setCertificateData(obj);
  };

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      await verifyCertificate(certificateData);
      setIsLoading(false);
      setVerified(true);
    } catch (err) {
      setIsLoading(false);
      setErr(err.response.data.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Verify a Certificate</h2>
      <div className={styles.verifyContainer}>
        <Logo className={styles.logo} />
        <label>
          Upload a json file containing the certificate
          <input type="file" className={styles.input} onChange={onChange} />
        </label>
        <Button title="Verify" loading={isLoading} onClick={handleVerify} />
      </div>
      <div className={styles.result}>
        {verified
          ? `This certificate has been successfully verified on Blockchain! Certificate signature : ${certificateData?.signature?.targetHash}`
          : err}
      </div>
    </div>
  );
};

export default Verify;
