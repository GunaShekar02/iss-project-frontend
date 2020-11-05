import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext("");

const Store = ({ children }) => {
  const [auth, setAuth] = useState("");

  useEffect(() => {
    setAuth(sessionStorage.getItem("apikey"));
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export default Store;
