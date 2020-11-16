import React from "react";
import Cookies from "js-cookie";
import OfferPublish from "../components/Offer/OfferPublish";

const Publish = ({ modal, setModal, token }) => {
  Cookies.set("lastPage", "/offer/publish");

  return <OfferPublish modal={modal} setModal={setModal} token={token} />;
};

export default Publish;
