import React from "react";
import { useParams } from "react-router-dom";
import OfferDetail from "../components/OfferDetail";
import Header from "../components/Header";

const Offer = () => {
  const { id } = useParams();

  return (
    <div>
      <Header />
      <OfferDetail id={id} />
    </div>
  );
};

export default Offer;
