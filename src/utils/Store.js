import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext("");

const Store = ({ children }) => {
  const [auth, setAuth] = useState("");
  const [type, setType] = useState("");
  const [roll, setRoll] = useState("");

  useEffect(() => {
    const tokenType = sessionStorage.getItem("type");
    console.log(tokenType);
    const token = sessionStorage.getItem("token");
    console.log(token);
    setAuth(token);
    setType(tokenType);

    const rollNo = sessionStorage.getItem("roll");
    setRoll(rollNo);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        roll,
        auth,
        setAuth: (token) => {
          setAuth(token);
          sessionStorage.setItem("token", token);
        },
        type,
        setType: (tokenType) => {
          setType(tokenType);
          sessionStorage.setItem("type", tokenType);
        },
        setRoll: (rollNo) => {
          setRoll(rollNo);
          sessionStorage.setItem("roll", rollNo);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Store;
