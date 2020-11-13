import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import OfferCard from "../OfferCard";
import "./index.css";

const getOffers = async (setOffers, setIsLoading) => {
  const url = Cookies.get("BackUrl") + "offers";
  try {
    const response = await axios.get(url);
    setOffers(response.data.offers);
    setIsLoading(false);
  } catch (error) {
    console.log(error.message);
    if (error.response && error.response.data && error.response.data.message) {
      alert(
        "Le chargement est impossible pour la raison suivante : \n\n" +
          error.response.data.message
      );
    } else {
      alert("Une erreur bloque le chargement des données");
    }
  }
};

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOffers(setOffers, setIsLoading);
  }, []);

  return isLoading ? (
    <div className="offers wrapper">Chargement encours</div>
  ) : (
    <div className="offers wrapper">
      {offers.map((offer, index) => {
        return <OfferCard key={index} offer={offer} />;
      })}
    </div>
  );
};

export default Offers;
