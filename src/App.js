import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";

/* Containers */
import Home from "./containers/Home";
import Offer from "./containers/Offer";

/* Components */
import Header from "./components/Header";
import Modal from "./components/Share/Modal";

function App() {
  const [token, setToken] = useState(Cookies.get("token"));
  const [modal, setModal] = useState(null);

  // Default timeout = session
  Cookies.set("BackUrl", "https://lereacteur-vinted-api.herokuapp.com/");

  // Fix timeout at one half hour (1/48 day) for authentication
  const cookieTimeout = 1 / 48;
  const setUserToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: cookieTimeout });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <Router>
      <Header setModal={setModal} token={token} setUserToken={setUserToken} />
      <Modal
        modal={modal}
        setModal={setModal}
        token={token}
        setUserToken={setUserToken}
      />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
