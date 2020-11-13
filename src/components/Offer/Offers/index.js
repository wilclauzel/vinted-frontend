import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import OfferCard from "../OfferCard";
import Paging from "../../Share/Paging";
import "./index.css";

const getOffers = async (
  setOffers,
  setIsLoading,
  setCurrentPage,
  setCountPage,
  requestedPage
) => {
  const pageSize = 8;
  const url =
    Cookies.get("BackUrl") +
    "offers?page=" +
    requestedPage +
    "&limit=" +
    pageSize;
  try {
    const response = await axios.get(url);
    setCurrentPage(requestedPage);
    setCountPage(Math.ceil(Number(response.data.count) / pageSize));
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
  const [currentPage, setCurrentPage] = useState(1);
  const [countPage, setCountPage] = useState(1);
  const [requestedPage, setRequestedPage] = useState(1);

  useEffect(() => {
    getOffers(
      setOffers,
      setIsLoading,
      setCurrentPage,
      setCountPage,
      requestedPage
    );
  }, [requestedPage]);

  return isLoading ? (
    <div className="offers wrapper">Chargement encours</div>
  ) : (
    <div className="offers wrapper">
      <div>
        {offers.map((offer, index) => {
          return <OfferCard key={index} offer={offer} />;
        })}
      </div>
      <Paging
        currentPage={currentPage}
        countPage={countPage}
        setRequestedPage={setRequestedPage}
      />
    </div>
  );
};

export default Offers;
