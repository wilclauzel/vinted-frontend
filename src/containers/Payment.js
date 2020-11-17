import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/Payment/CheckoutForm";

const Payment = ({ modal, setModal, token }) => {
  useEffect(() => {
    if (!token) {
      setModal("Login");
    }
  }, [modal, setModal, token]);

  const stripePromise = loadStripe(
    "pk_test_51HoV62K0RnRjU9fDGvg0sTeUIbwoFWytry5WvhsXaq8kMHmRded01EM93LnkweWdVGtASYz5kwd2dXOwD1Qu3UBB00XxbJCoEA"
  );

  return modal ? (
    <></>
  ) : (
    <Elements stripe={stripePromise}>
      <CheckoutForm token={token} />
    </Elements>
  );
};

export default Payment;
