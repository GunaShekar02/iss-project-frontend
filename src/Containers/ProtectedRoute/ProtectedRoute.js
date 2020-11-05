import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const [isAdmin, setAdmin] = useState(0);

  useEffect(() => {
    const apiKey = sessionStorage.getItem("apikey");
    if (apiKey) setAdmin(1);
    else setAdmin(2);
  }, []);

  switch (isAdmin) {
    case 0:
      return null;
    case 1:
      return props.children;
    case 2:
      return <Redirect to="/login" />;
    default:
      return null;
  }
};

export default ProtectedRoute;
