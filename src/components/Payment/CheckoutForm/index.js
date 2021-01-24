import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import "./index.css";

const CheckoutForm = ({ token }) => {
  const [paymentInProcess, setPaymentInProcess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const history = useHistory();

  const basket = location.state.basket;
  if (!basket || !basket.offer) {
    alert("Votre panier est vide.");
    const lastPage = Cookies.get("lastPage");
    history.push(lastPage ? lastPage : "/");
  }

  const quantity = 1;
  const grossAmount =
    (basket.offer.product_price ? basket.offer.product_price : 0) * quantity;
  const deliveryCost = Math.ceil(grossAmount * 0.2);
  const insuranceCost = Math.ceil(grossAmount * 0.1);
  const netAmount = grossAmount + deliveryCost + insuranceCost;

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    try {
      setPaymentInProcess(true);
      const url = Cookies.get("BackUrl") + "payment";
      //1- Get payment data
      const cardElement = elements.getElement(CardElement);

      //2- Create payment token
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "Id de l'acheteur",
      });

      if (stripeResponse.error) {
        setPaymentInProcess(false);
        console.log(stripeResponse.error);
        alert(
          stripeResponse.error.message
            ? stripeResponse.error.message
            : "Votre paiement a été rejeté par Stripe."
        );
        return;
      }
      const stripeToken = stripeResponse.token.id;

      //3- Create payment data
      const data = {
        label: `Votre commande - ${
          basket.offer.product_name && basket.offer.product_name
        }`,
        quantity: quantity,
        price: basket.offer.product_price ? basket.offer.product_price : 0,
        deliveryCost: deliveryCost,
        insuranceCost: insuranceCost,
        amount: netAmount,
        currency: "eur",
        offerId: basket.offer._id,
        stripeToken: stripeToken,
      };

      //4- Send payment
      const response = await axios.post(url, data, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      setPaymentInProcess(false);

      if (
        response.data.paidAmount &&
        Number.parseFloat(response.data.paidAmount).toFixed(2) ===
          Number.parseFloat(netAmount).toFixed(2)
      ) {
        alert("Le paiement de votre commande a bien été réalisé.");
        const lastPage = Cookies.get("lastPage");
        history.push(lastPage ? lastPage : "/");
      } else {
        alert("Le paiement n'a pu être perçu. Vous devez recommencer.");
      }
    } catch (error) {
      setPaymentInProcess(false);
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(
          "Le paiement de votre commande est impossible pour la raison suivante : \n\n" +
            error.response.data.message
        );
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message
      ) {
        alert(
          "Le paiement de la commande est impossible pour la raison suivante : \n\n" +
            error.response.data.error.message
        );
      } else {
        alert("Une erreur bloque le paiement de la commande");
      }
    }
  };
  return (
    <div className="checkout-form">
      <div className="wrapper">
        <div>
          <h3>Résumé de votre commande</h3>
          <div className="checkout-form-details">
            <p>
              <span>Produit</span>
              <span>
                {Number(grossAmount).toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}
              </span>
            </p>
            <p>
              <span>Frais de protetion acheteurs</span>
              <span>
                {" "}
                {Number(insuranceCost).toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}
              </span>
            </p>
            <p>
              <span>Frais de port</span>
              <span>
                {" "}
                {Number(deliveryCost).toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}
              </span>
            </p>
          </div>
          <div className="checkout-form-total">
            <p>
              <span>Total</span>
              <span>
                {" "}
                {Number(netAmount).toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}
              </span>
            </p>
            <p>
              Il ne vous reste plus qu'une étape pour vous offrir{" "}
              <strong>
                {basket.offer.product_name
                  ? basket.offer.product_name
                  : "ce produit"}
              </strong>
              . Vous allez payer{" "}
              <strong>
                {Number(netAmount).toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}
              </strong>{" "}
              (frais de protection et frais de port inclus).{" "}
            </p>
          </div>
          <div className="checkout-form-payment">
            <form onSubmit={handlePaymentSubmit}>
              <CardElement />
              {paymentInProcess ? (
                <div className="checkout-form-payment-loader">
                  <Loader
                    type="BallTriangle"
                    color="#09b1ba"
                    height={80}
                    width={80}
                  />
                </div>
              ) : (
                <button type="submit">Paiement</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
