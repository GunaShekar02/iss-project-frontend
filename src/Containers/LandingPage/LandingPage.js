import React from "react";
import { useHistory } from "react-router-dom";

import Button from "../../Components/Button/Button";

import styles from "./LandingPage.module.css";

import { ReactComponent as HeroImage } from "../../assets/images/hero.svg";

const LandingPage = () => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div>
        <HeroImage className={styles.heroImage} />
      </div>
      <div>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>IIITM Results</h1>
          <p className={styles.subtitle}>Redefining Privacy.</p>
          <p className={styles.content}>
            In an attempt to reduce human-labour and ensure 100% privacy of
            results, this is a result-publishing and viewing system built using
            Asymmetric Key Encryption.
          </p>
          <Button
            title="Let's Go!"
            className={styles.button}
            onClick={() => history.push("/verify")}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
