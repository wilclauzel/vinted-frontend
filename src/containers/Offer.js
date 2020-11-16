import React from "react";
import { useParams } from "react-router-dom";
import OfferDetail from "../components/Offer/OfferDetail";

const Offer = ({ modal }) => {
  const { id } = useParams();

  return (
    <div>
      <OfferDetail id={id} modal={modal} />
    </div>
  );
};

export default Offer;
