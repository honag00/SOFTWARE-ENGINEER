import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Beetify from "./components/Beetify";
import Albums from "./components/albums";
import AboutUs from "./components/AboutUs";
import FollowArtists from "./components/FollowArtists";
import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider";

export default function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        // Save token to local storage
        localStorage.setItem("token", token);
        dispatch({ type: reducerCases.SET_TOKEN, token });
      }
    } else {
      // Check if token exists in local storage
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        dispatch({ type: reducerCases.SET_TOKEN, token: storedToken });
      }
    }
    document.title = "beetify";
  }, [dispatch, token]);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/Beetify">
            <div>{token ? <Beetify /> : <Login />}</div>
          </Route>
          <Route path="/albums">
            <div>{token ? <Albums /> : <Login />}</div> 
          </Route>
          <Route path="/AboutUs">
            <div>{token ? <AboutUs /> : <Login />}</div>
          </Route>
          <Route path="/FollowArtists">
            <div>{token ? <FollowArtists /> : <Login />}</div>
          </Route>
          <Route path="/">
            <div>{token ? <Beetify /> : <Login />}</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
