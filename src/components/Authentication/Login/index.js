import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import "../index.css";

const handleLogin = async (event, setUserToken, history, email, password) => {
  try {
    event.preventDefault();
    const userLogin = { email, password };
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/user/login",
      userLogin
    );
    setUserToken(response.data.token);
    history.push("/");
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      alert(
        "Votre connexion est bloquée pour la raison suivante : \n\n" +
          error.response.data.message
      );
    } else {
      alert("Une erreur bloque votre connexion");
    }
  }
};

const Login = ({ setUserToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  return (
    <div className="wrapper login">
      <h2>Se connecter</h2>
      <form
        onSubmit={(event) => {
          handleLogin(event, setUserToken, history, email, password);
        }}
      >
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Se connecter</button>
      </form>
      <p>
        Pas encore de compte ? <Link to="/signup">Inscris-toi !</Link>
      </p>
    </div>
  );
};

export default Login;
