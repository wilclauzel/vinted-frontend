import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Loader from "react-loader-spinner";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import UserCard from "../../UserCard";

import "./index.css";

const getOffers = async (id, setOffer, setIsLoading, setImages) => {
  const url = Cookies.get("BackUrl") + "offer/" + id;
  try {
    const response = await axios.get(url);
    setOffer(response.data);

    const pictures = [];
    response.data.product_pictures && response.data.product_pictures.length > 0
      ? response.data.product_pictures.forEach((item) => {
          pictures.push({
            original: item.secure_url,
            thumbnail: item.secure_url,
          });
          // originalClass: "offer-images-ImageGallery-image",
        })
      : response.data.product_image &&
        pictures.push(response.data.product_image);
    setImages(pictures);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data && error.response.data.message) {
      alert(
        "Le chargement est impossible pour la raison suivante : \n\n" +
          error.response.data.message
      );
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.message
    ) {
      alert(
        "Le chargement est impossible pour la raison suivante : \n\n" +
          error.response.data.error.message
      );
    } else {
      alert("Une erreur bloque le chargement des données");
    }
    setIsLoading(false);
  }
};

const OfferDetail = ({ id, modal }) => {
  const [offer, setOffer] = useState();
  const [images, setImages] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOffers(id, setOffer, setIsLoading, setImages);
  }, [id]); // Specify id props to avoid error : React Hook useEffect has a missing dependency: 'xxx'

  return isLoading ? (
    <Loader type="BallTriangle" color="#09b1ba" height={80} width={80} />
  ) : modal ? (
    <></>
  ) : (
    <div className="offerdetail">
      <div
        className={
          images && images.length > 0
            ? "wrapper offerdetail-withimage "
            : "wrapper offerdetail-withoutimage"
        }
      >
        {images && (
          <div className="offer-images">
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={false}
              showNav={false}
              useBrowserFullscreen={false}
              thumbnailPosition="top"
              autoPlay={true}
            />
          </div>
        )}
        <div className="offerdetail-data">
          <div>
            <p>
              {Number(offer.product_price).toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
              })}
            </p>
            {offer.product_details &&
              offer.product_details.map((feature, index) => {
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
            {offer.owner?.account && (
              <UserCard
                username={offer.owner.account.username}
                imageUrl={
                  offer.owner.account.avatar
                    ? offer.owner.account.avatar.secure_url
                    : null
                }
              />
            )}
          </div>
          <Link
            to={{ pathname: "/payment", state: { basket: { offer } } }}
            className="offerdetail-button"
          >
            <div>Acheter</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;
