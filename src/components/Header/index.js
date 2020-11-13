import React from "react";
import Logo from "../Share/Logo";
import "./index.css";

const Header = ({ setModal, token, setUserToken }) => {
  return (
    <header>
      <div>
        <div className="wrapper">
          <div>
            <Logo setModal={setModal} />
            <input type="text" placeholder="Rechercher des articles" />
            <div className="header-buttons-connect">
              {token ? (
                <button
                  className="deconnect"
                  onClick={() => {
                    setUserToken(null);
                  }}
                >
                  Se Déconnecter
                </button>
              ) : (
                <>
                  <button
                    className="connect"
                    onClick={() => {
                      setModal("Signup");
                    }}
                  >
                    S'inscrire
                  </button>
                  <button
                    className="connect"
                    onClick={() => {
                      setModal("Login");
                    }}
                  >
                    Se connecter
                  </button>
                </>
              )}
            </div>
            <button className="header-button-sale">Vends tes articles</button>
          </div>
        </div>
      </div>
      <div>
        <div className="wrapper">
          <div>
            <p>Femmes Hommes Enfants Maison ....</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
