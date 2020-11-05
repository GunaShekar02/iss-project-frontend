import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./Containers/LandingPage/LandingPage";
import Login from "./Containers/Login/Login";
import Issue from "./Containers/Issue/Issue";
import ProtectedRoute from "./Containers/ProtectedRoute/ProtectedRoute";
import Verify from "./Containers/Verify/Verify";
import Find from "./Containers/Register/Register";
import Display from "./Containers/Display/Display";

import Navbar from "./Components/Navbar/Navbar";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/issue">
          <ProtectedRoute>
            <Issue />
          </ProtectedRoute>
        </Route>
        <Route exact path="/verify">
          <Verify />
        </Route>
        <Route exact path="/find">
          <Find />
        </Route>
        <Route exact path="/display">
          <Display />
        </Route>
      </Switch>
    </>
  );
};

export default App;
