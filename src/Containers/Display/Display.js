import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Button from "../../Components/Button/Button";

import styles from "./Display.module.css";

const Display = () => {
  const [fullCerti, setFullCerti] = useState();
  const [certificateData, setCertificateData] = useState({});

  const parser = (item) => item.split(":").slice(-1);

  const location = useLocation();
  useEffect(() => {
    const {
      state: { certificate },
    } = location;

    setFullCerti(certificate);

    const {
      data: {
        heading,
        context,
        introduction,
        student: { name },
        content,
        logo,
        signature,
      },
    } = JSON.parse(certificate);

    setCertificateData({
      heading: parser(heading),
      context: parser(context),
      introduction: parser(introduction),
      name: parser(name),
      content: parser(content),
      logo: `data:${parser(logo)}`,
      signature: {
        name: parser(signature.name),
        image: `data:${parser(signature.image)}`,
      },
    });
  }, [location]);

  const saveJSON = () => {
    const certiData = JSON.stringify(JSON.parse(fullCerti));
    const blob = new Blob([certiData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "degree-certificate.json";
    link.href = url;
    link.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.certificateContainer}>
        <h1 className={styles.title}>{certificateData.heading}</h1>
        <h2 className={styles.subtitle}>{certificateData.context}</h2>
        <span className={styles.intro}>{certificateData.introduction}</span>
        <span className={styles.name}>{certificateData.name}</span>
        <span className={styles.intro}>{certificateData.content}</span>
        <div className={styles.issuedBy}>
          <span className={styles.intro}>
            This certificate has been issued by :
          </span>
          <div className={styles.issuers}>
            <img
              src={certificateData.logo}
              className={styles.logo}
              alt="Logo"
            />
            <div className={styles.signature}>
              <img
                src={certificateData.signature?.image}
                className={styles.signImage}
                alt="Signature"
              />
              {certificateData.signature?.name}
            </div>
          </div>
          <Button title="Download" onClick={saveJSON} />
        </div>
      </div>
    </div>
  );
};

export default Display;
