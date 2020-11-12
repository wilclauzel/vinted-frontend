import React, { useState, useEffect } from "react";
import axios from "axios";
import OfferCard from "../OfferCard";
import "./index.css";

// TODO : regrouper les composants par domaine

const getOffers = async (setOffers, setIsLoading) => {
  // TODO faire try/catch
  const response = await axios.get(
    "https://lereacteur-vinted-api.herokuapp.com/offers"
  );
  setOffers(response.data.offers);
  setIsLoading(false);
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
