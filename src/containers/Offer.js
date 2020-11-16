import React from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import OfferDetail from "../components/Offer/OfferDetail";

const Offer = ({ modal }) => {
  const { id } = useParams();
  Cookies.set("lastPage", "/offer/" + id);
  return (
    <div>
      <OfferDetail id={id} modal={modal} />
    </div>
  );
};

export default Offer;
