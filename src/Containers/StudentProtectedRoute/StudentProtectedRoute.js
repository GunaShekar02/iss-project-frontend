import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../../utils/Store";

const StudentProtectedRoute = (props) => {
  const [isAdmin, setAdmin] = useState(0);
  const { auth, type } = useContext(AuthContext);

  useEffect(() => {
    if (
      sessionStorage.getItem("type") === "userToken" &&
      sessionStorage.getItem("token")
    )
      setAdmin(1);
    else setAdmin(2);
    // setAdmin(1);
  }, []);

  switch (isAdmin) {
    case 0:
      return null;
    case 1:
      return props.children;
    case 2:
      return <Redirect to="/student/login" />;
    default:
      return null;
  }
};

export default StudentProtectedRoute;
