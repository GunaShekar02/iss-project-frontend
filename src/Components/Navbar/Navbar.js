import React, { useState, useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import styles from "./Navbar.module.css";

import { ReactComponent as Logo } from "../../assets/images/logo.svg";

import useMediaQuery from "../../utils/useMediaQuery";

import { AuthContext } from "../../utils/Store";

const Navbar = () => {
  const [auth] = useContext(AuthContext);

  const history = useHistory();

  const isMobile = useMediaQuery("(max-width: 700px)");
  const [showMobileNav, setShowMobileNav] = useState(false);
  const hamburger = useRef();
  const mobileMenu = useRef();

  const handleHamburgerClick = () => {
    if (showMobileNav) {
      hamburger.current.childNodes.forEach((node) => {
        node.style.backgroundColor = "#6c63ff";
        node.style.position = "relative";
        node.style.right = "0";
      });
      hamburger.current.childNodes[0].style.transform = "rotate(0deg)";
      hamburger.current.childNodes[1].style.display = "block";
      hamburger.current.childNodes[2].style.transform = "rotate(0deg)";
      mobileMenu.current.style.right = "-100vw";
      setShowMobileNav(false);
    } else {
      hamburger.current.childNodes.forEach((node) => {
        node.style.backgroundColor = "white";
        node.style.position = "absolute";
        node.style.right = "20px";
      });
      hamburger.current.childNodes[0].style.transform = "rotate(45deg)";
      hamburger.current.childNodes[1].style.display = "none";
      hamburger.current.childNodes[2].style.transform = "rotate(-45deg)";
      mobileMenu.current.style.right = "0vw";
      setShowMobileNav(true);
    }
  };

  useEffect(() => {
    const storageListener = () => {
      console.log("LISTENER CALLED");
      console.log(sessionStorage.getItem("apikey"));
    };
    window.addEventListener("storage", storageListener);

    return () => window.removeEventListener("storage", storageListener);
  }, []);
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.brand} onClick={() => history.push("/")}>
          <Logo className={styles.logo} />
          <h1 className={styles.title}>
            IIITM Results {auth ? "- Admin" : null}
          </h1>
        </div>
        {isMobile ? (
          <div
            className={styles.hamburger}
            onClick={handleHamburgerClick}
            ref={hamburger}
          >
            <div />
            <div />
            <div />
          </div>
        ) : (
          <div className={styles.links}>
            <h2 onClick={() => history.push("/register")}>Register</h2>
            <h2 onClick={() => history.push("/verify")}>Results</h2>
            <h2 onClick={() => history.push("/issue")}>Admin</h2>
          </div>
        )}
      </div>
      <div className={styles.mobileLinks} ref={mobileMenu}>
        <h2
          onClick={() => {
            history.push("/register");
            handleHamburgerClick();
          }}
        >
          Register
        </h2>
        <h2
          onClick={() => {
            history.push("/verify");
            handleHamburgerClick();
          }}
        >
          Results
        </h2>
        <h2
          onClick={() => {
            history.push("/issue");
            handleHamburgerClick();
          }}
        >
          Admin
        </h2>
      </div>
    </>
  );
};

export default Navbar;
