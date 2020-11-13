import React, { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "../index.css";

const handleLogin = async (
  event,
  setModal,
  setUserToken,
  history,
  email,
  password
) => {
  try {
    event.preventDefault();
    const userLogin = { email, password };
    const url = Cookies.get("BackUrl") + "user/login";
    const response = await axios.post(url, userLogin);
    if (!response.data.token) {
      alert("Votre authentification est incorrecte");
    }
    // In all cases, set updates and go home
    setUserToken(response.data.token);
    setModal(null);
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

const Login = ({ setUserToken, setModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  return (
    <div className="wrapper login">
      <h2>Se connecter</h2>
      <form
        onSubmit={(event) => {
          handleLogin(event, setModal, setUserToken, history, email, password);
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
        Pas encore de compte ?
        <span
          onClick={() => {
            setModal("Signup");
          }}
        >
          Inscris-toi !
        </span>
      </p>
    </div>
  );
};

export default Login;
