import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faSearch,
  faSync,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../Share/Logo";
import PriceCriteria from ".././/Share/Criteria/PriceCriteria";

import "./index.css";

const Header = ({
  setModal,
  token,
  setUserToken,
  searchCriteria,
  setSearchCriteria,
  setRefreshOffers,
}) => {
  const history = useHistory();
  const [displayPriceCriteria, setDisplayPriceCriteria] = useState(false);

  const [minimalPrice, setMinimalPrice] = useState(
    Number(searchCriteria.minimalPrice) ? searchCriteria.minimalPrice : ""
  );

  const [maximalPrice, setMaximalPrice] = useState(
    Number(searchCriteria.maximalPrice) ? searchCriteria.maximalPrice : ""
  );

  const handleUpdateSearch = (title, minimalPrice, maximalPrice) => {
    const criteria = { title, minimalPrice, maximalPrice };
    setSearchCriteria(criteria);
  };
  const handleUpdateMinimalPrice = (value) => {
    const price = Number(value) ? value : "";
    setMinimalPrice(price);
    handleUpdateSearch(
      searchCriteria.title,
      price,
      searchCriteria.maximalPrice
    );
  };
  const handleUpdateMaximalPrice = (value) => {
    const price = Number(value) ? value : "";
    setMaximalPrice(price);
    handleUpdateSearch(
      searchCriteria.title,
      searchCriteria.minimalPrice,
      price
    );
  };
  return (
    <header>
      <div>
        <div className="wrapper">
          <div>
            <Logo setModal={setModal} />
            <div className="search search-display">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                placeholder="Rechercher des articles"
                value={searchCriteria.title ? searchCriteria.title : ""}
                onChange={(e) => {
                  handleUpdateSearch(
                    e.target.value,
                    searchCriteria.minimalPrice,
                    searchCriteria.maximalPrice
                  );
                }}
              />
              <div className="search-criteria">
                <button
                  onClick={() => {
                    setDisplayPriceCriteria(!Boolean(displayPriceCriteria));
                  }}
                >
                  <span>Prix</span>
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
                {displayPriceCriteria && (
                  <div className="search-criteria-selector">
                    <PriceCriteria
                      minimalPrice={minimalPrice}
                      setMinimalPrice={handleUpdateMinimalPrice}
                      maximalPrice={maximalPrice}
                      setMaximalPrice={handleUpdateMaximalPrice}
                    />
                  </div>
                )}
              </div>
              <div
                className="search-criteria-refresh"
                onClick={() => {
                  setRefreshOffers(true);
                }}
              >
                <FontAwesomeIcon icon={faSync} />
              </div>
            </div>
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
            <button
              className="header-button-sale"
              onClick={() => {
                history.push("/offer/publish");
              }}
            >
              Vends tes articles
            </button>
          </div>
          <div className="search-line2-hidden">
            <div className="search search2-hidden">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                placeholder="Rechercher des articles"
                value={searchCriteria.title ? searchCriteria.title : ""}
                onChange={(e) => {
                  handleUpdateSearch(
                    e.target.value,
                    searchCriteria.minimalPrice,
                    searchCriteria.maximalPrice
                  );
                }}
              />
              <div className="search-criteria">
                <button
                  onClick={() => {
                    setDisplayPriceCriteria(!Boolean(displayPriceCriteria));
                  }}
                >
                  <span>Prix</span>
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
                {displayPriceCriteria && (
                  <div className="search-criteria-selector">
                    <PriceCriteria
                      minimalPrice={minimalPrice}
                      setMinimalPrice={handleUpdateMinimalPrice}
                      maximalPrice={maximalPrice}
                      setMaximalPrice={handleUpdateMaximalPrice}
                    />
                  </div>
                )}
              </div>
              <div
                className="search-criteria-refresh"
                onClick={() => {
                  setRefreshOffers(true);
                }}
              >
                <FontAwesomeIcon icon={faSync} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="wrapper">
          <div>
            {searchCriteria && (
              <div className="search-criteria-detail">
                {searchCriteria.title && (
                  <div
                    onClick={() => {
                      handleUpdateSearch(
                        "",
                        searchCriteria.minimalPrice,
                        searchCriteria.maximalPrice
                      );
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                    <span></span>
                    {searchCriteria.title}
                  </div>
                )}
                {searchCriteria.minimalPrice && (
                  <div
                    onClick={() => {
                      handleUpdateMinimalPrice("");
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                    <span>
                      {Number(searchCriteria.minimalPrice).toLocaleString(
                        "fr-FR",
                        {
                          style: "currency",
                          currency: "EUR",
                        }
                      )}
                    </span>
                  </div>
                )}
                {searchCriteria.maximalPrice && (
                  <div
                    onClick={() => {
                      handleUpdateMaximalPrice("");
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                    <span>
                      {Number(searchCriteria.maximalPrice).toLocaleString(
                        "fr-FR",
                        {
                          style: "currency",
                          currency: "EUR",
                        }
                      )}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
