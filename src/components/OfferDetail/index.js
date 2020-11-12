import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "../UserCard";
import "./index.css";

const getOffers = async (id, setOffer, setIsLoading) => {
  const url = "https://lereacteur-vinted-api.herokuapp.com/offer/" + id;

  const response = await axios.get(url);
  setOffer(response.data);
  setIsLoading(false);
};

const OfferDetail = ({ id }) => {
  const [offer, setOffer] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOffers(id, setOffer, setIsLoading);
  }, [id]); // Specifie id props to avoir error : React Hook useEffect has a missing dependency: 'xxx'

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
            <div className="offerdetail-feature">
              <span>MARQUE</span>
              <span>{offer.product_details[0].MARQUE}</span>
            </div>
            <div className="offerdetail-feature">
              <span>TAILLE</span>
              <span>{offer.product_details[1].TAILLE}</span>
            </div>
            <div className="offerdetail-feature">
              <span>ETAT</span>
              <span>{offer.product_details[2].ETAT}</span>
            </div>
            <div className="offerdetail-feature">
              <span>COULEUR</span>
              <span>{offer.product_details[3].COULEUR}</span>
            </div>
            <div className="offerdetail-feature">
              <span>EMPLACEMENT</span>
              <span>
                {offer.product_details[4] &&
                  offer.product_details[4].EMPLACEMENT}
              </span>
            </div>
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
