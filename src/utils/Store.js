import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext("");

const Store = ({ children }) => {
  const [auth, setAuth] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const adminToken = sessionStorage.getItem("adminToken");
    if (adminToken) setAuth(adminToken);
    else {
      const userToken = sessionStorage.getItem("userToken");
      if (userToken) setAuth(userToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, type, setType }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Store;
