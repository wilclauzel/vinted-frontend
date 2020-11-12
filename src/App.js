import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookie from "js-cookie";

/* Containers */
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Signup from "./containers/Signup";
import Login from "./containers/Login";

/* Components */
import Header from "./components/Header";

function App() {
  const [token, setToken] = useState(Cookie.get("token"));

  const setUserToken = (token) => {
    if (token) {
      setToken(token);
      Cookie.set("token", token, { expires: 1 / 48 }); // en jour => 1/48 = 1/2 heure
    } else {
      setToken(null);
      Cookie.remove("token");
    }
  };

  return (
    <Router>
      <Header token={token} setUserToken={setUserToken} />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/login">
          <Login setUserToken={setUserToken} />
        </Route>
        <Route path="/signup">
          <Signup setUserToken={setUserToken} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
