import { useEffect } from "react";
import "./Stripe.css";
import { useSelector } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

import stripeImageWhite from "../../assets/stripe_white.png";

export const Stripe = ({ orderId, amount }) => {
  const userId =
    useSelector((state) => state.authReducer.userId) ||
    localStorage.getItem("userId");

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Pr8iUP1hmPqGb5E80BaSQip23AnQTU3ADvA57Nj5NUoAvyIVe8GnIsjMM49MXdoNl2HWfyndVdlNJRd41iSkpGd00SYwnGZ8x"
    );

    const sessionId = await fetch("http://localhost:3399/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        orderId,
        userId,
        payType: "stripe",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.data);
        // console.log(data.data.sessionId)
        return data.data.sessionId;
      })
      .catch((error) => console.error("Error:", error));

    // console.log(sessionId);

    const result = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });

    // console.log(result)
  };

  return (
    <div id="stripeButtonContainer">
      <button className="StripeButton" onClick={makePayment}>
        <img className="StripeLogoButton" src={stripeImageWhite} alt="" />
      </button>
    </div>
  );
};
