import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Flights from "./components/Flights";
import { Authentication } from "./utils";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Hotels from "./components/Hotels";
import Users from "./components/Users";

const App = () => {
  const [token, setToken] = useState("");
  const goTo = (url: string) => {
    window.location.replace(url);
  };

  useEffect(() => {
    const sameToken = sessionStorage.getItem("Token");
    if (sameToken) {
      setToken(sameToken);
    }

    return () => {
      // cleanup
    };
  }, []);

  const authenticate = async (login: Authentication) => {
    return axios
      .post("http://localhost:9090/api/auth/login", login)
      .then((response) => {
        if (response.headers.authorization) {
          const newToken = response.headers.authorization.split(" ")[1];
          setToken(token);
          sessionStorage.setItem("Token", newToken);
          goTo("/");
        }
      });
  };
  return (
    <BrowserRouter>
      <Switch>
        <div className="App container">
          <NavBar auth={token} />
          <Route
            exact
            path="/flights"
            render={() =>
              token ? <Flights token={token} /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/hotels"
            render={() =>
              token ? <Hotels token={token} /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/users"
            render={() =>
              token ? <Users token={token} /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/login"
            component={() =>
              !token ? (
                <Login authenticate={authenticate} />
              ) : (
                <Redirect to="/flights" />
              )
            }
          />
          <Route
            exact
            path="/"
            render={() => (!token ? <Welcome /> : <Redirect to="/flights" />)}
          />
        </div>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
