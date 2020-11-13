import React from "react";
import { useParams } from "react-router-dom";
import OfferDetail from "../components/Offer/OfferDetail";

const Offer = () => {
  const { id } = useParams();

  return (
    <div>
      <OfferDetail id={id} />
    </div>
  );
};

export default Offer;
