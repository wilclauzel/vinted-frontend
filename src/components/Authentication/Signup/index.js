import React, { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "../index.css";

const handleSignup = async (
  event,
  setModal,
  setUserToken,
  history,
  username,
  email,
  password
) => {
  try {
    event.preventDefault();
    const user = { username, email, password };
    const url = Cookies.get("BackUrl") + "user/signup";
    const response = await axios.post(url, user);
    if (!response.data.token) {
      alert("Votre authentification est incorrecte");
    }
    // In all cases, set updates and go home
    setUserToken(response.data.token);
    setModal(null);
    const lastPage = Cookies.get("lastPage");
    history.push(lastPage ? lastPage : "/");
  } catch (error) {
    console.log(error.message);
    if (error.response && error.response.data && error.response.data.message) {
      alert(
        "Votre inscription est bloquée pour la raison suivante : \n\n" +
          error.response.data.message
      );
    } else {
      alert("Une erreur bloque votre inscription");
    }
  }
};

const Signup = ({ setModal, setUserToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  return (
    <div className="wrapper signup ">
      <h2>S'inscrire</h2>
      <form
        onSubmit={(event) => {
          handleSignup(
            event,
            setModal,
            setUserToken,
            history,
            username,
            email,
            password
          );
        }}
      >
        <input
          id="userName"
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          id="password"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">S'inscrire</button>
      </form>
      <p>
        Tu as déjà un compte ?
        <span
          onClick={() => {
            setModal("Login");
          }}
        >
          Connecte-toi !
        </span>
      </p>
    </div>
  );
};

export default Signup;
