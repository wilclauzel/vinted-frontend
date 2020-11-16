import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import UserCard from "../../UserCard";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.css";

const getOffers = async (id, setOffer, setIsLoading, setImages) => {
  const url = Cookies.get("BackUrl") + "offer/" + id;
  try {
    const response = await axios.get(url);
    setOffer(response.data);
    setIsLoading(false);
    const pictures = [];
    response.data.product_pictures
      ? response.data.product_pictures.forEach((item) => {
          pictures.push(item);
        })
      : response.data.product_image &&
        pictures.push(response.data.product_image);
    setImages(pictures);
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

const OfferDetail = ({ id, modal }) => {
  const [offer, setOffer] = useState();
  const [images, setImages] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOffers(id, setOffer, setIsLoading, setImages);
  }, [id]); // Specify id props to avoid error : React Hook useEffect has a missing dependency: 'xxx'

  // const customRenderThumb = (children) =>
  //   children.map((item) => {
  //     return (
  //       <img
  //         key={item.asset_id}
  //         src={item.secure_url}
  //         alt={offer.product_name}
  //       />
  //     );
  //   });
  // const customRenderItem = (item, props) => (
  //   <item.type {...item.props} {...props} />
  // );
  return isLoading ? (
    <div>Chargement encours</div>
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
          <div>
            {" "}
            <Carousel
              className="offer-images"
              showStatus={false}
              showThumbs={true}
              showIndicators={true}
              swipeable={true}
              autoPlay={true}
              // renderThumbs={customRenderThumb}
              // renderItem={customRenderItem}
            >
              {images &&
                images.map((item, index) => {
                  // console.log(item.asset_id);
                  return (
                    <div key={item.asset_id ? item.asset_id : index}>
                      <img src={item.secure_url} alt={offer.product_name} />
                      {/* <p className="legend"> Légende 1 </p> Pas de titre de photo ....*/}
                    </div>
                  );
                })}
            </Carousel>
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
              imageUrl={
                offer.owner.account.avatar
                  ? offer.owner.account.avatar.secure_url
                  : null
              }
            />
          </div>
          <button>Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;
