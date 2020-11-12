import React from "react";
import { Link } from "react-router-dom";
import UserCard from "../UserCard";
import "./index.css";

const OfferCard = ({ offer }) => {
  return (
    <div className="offer">
      <UserCard
        username={offer.owner.account.username}
        imageUrl={offer.owner.account.avatar.secure_url}
        smallSize={true}
      />

      <Link to={`/offer/${offer._id}`} className="offer-image">
        <img src={offer.product_image.secure_url} alt={offer.product_name} />
      </Link>

      <p className="offer-price">
        {Number(offer.product_price).toLocaleString("fr-FR", {
          style: "currency",
          currency: "EUR",
        })}
      </p>
      <p className="offer-info">{offer.product_details[1].TAILLE}</p>
      <p className="offer-info">{offer.product_details[0].MARQUE}</p>
    </div>
  );
};

export default OfferCard;
