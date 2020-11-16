import "./App.css";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faGreaterThan,
  faLessThan,
  faCaretDown,
  faTimes,
  faSync,
} from "@fortawesome/free-solid-svg-icons";

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
  const [searchCriteria, setSearchCriteria] = useState({});
  const [refreshOffers, setRefreshOffers] = useState(true);

  library.add(
    faSearch,
    faGreaterThan,
    faLessThan,
    faCaretDown,
    faTimes,
    faSync
  );

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
      <Header
        setModal={setModal}
        token={token}
        setUserToken={setUserToken}
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
        setRefreshOffers={setRefreshOffers}
      />
      <Modal
        modal={modal}
        setModal={setModal}
        token={token}
        setUserToken={setUserToken}
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
        setRefreshOffers={setRefreshOffers}
      />
      <Switch>
        <Route path="/offer/:id">
          <Offer modal={modal} />
        </Route>
        <Route path="/">
          <Home
            modal={modal}
            searchCriteria={searchCriteria}
            refreshOffers={refreshOffers}
            setRefreshOffers={setRefreshOffers}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
