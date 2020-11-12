import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import "../index.css";

const handleSignup = async (
  event,
  setUserToken,
  history,
  username,
  email,
  password
) => {
  try {
    event.preventDefault();
    const user = { username, email, password };
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/user/signup",
      user
    );
    setUserToken(response.data);
    history.push("/");
  } catch (error) {
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

const Signup = ({ setUserToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  return (
    <div className="wrapper signup ">
      <h2>S'inscrire</h2>
      <form
        onSubmit={(event) => {
          handleSignup(event, setUserToken, history, username, email, password);
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
        Tu as déjà un compte ? <Link to="/login">Connecte-toi !</Link>
      </p>
    </div>
  );
};

export default Signup;
