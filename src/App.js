import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./Containers/LandingPage/LandingPage";
import Login from "./Containers/Login/Login";
import Issue from "./Containers/Issue/Issue";
import ProtectedRoute from "./Containers/ProtectedRoute/ProtectedRoute";
import Results from "./Containers/Results/Results";
import Register from "./Containers/Register/Register";
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
          <Results />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/display">
          <Display />
        </Route>
      </Switch>
    </>
  );
};

export default App;
