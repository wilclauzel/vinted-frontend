import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import UserCard from "../../UserCard";
import "./index.css";

const getOffers = async (id, setOffer, setIsLoading) => {
  const url = Cookies.get("BackUrl") + "offer/" + id;
  try {
    const response = await axios.get(url);
    setOffer(response.data);
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

const OfferDetail = ({ id }) => {
  const [offer, setOffer] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOffers(id, setOffer, setIsLoading);
  }, [id]); // Specify id props to avoid error : React Hook useEffect has a missing dependency: 'xxx'

  return isLoading ? (
    <div>Chargement encours</div>
  ) : (
    <div className="offerdetail">
      <div className="wrapper">
        <div>
          <img src={offer.product_image.secure_url} alt={offer.product_name} />
        </div>
        <div className="offerdetail-data">
          <div>
            <p>
              {Number(offer.product_price).toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
              })}
            </p>
            {offer.product_details.map((feature, index) => {
              const keys = Object.keys(feature);
              return (
                <div key={index} className="offerdetail-feature">
                  <span>{keys[0]}</span>
                  <span>{feature[keys[0]]}</span>
                </div>
              );
            })}
          </div>
          <div className="separator"></div>
          <div>
            <p>{offer.product_name}</p>
            <p>{offer.product_description}</p>
            <UserCard
              username={offer.owner.account.username}
              imageUrl={offer.owner.account.avatar.secure_url}
            />
          </div>
          <button>Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;
