import { useEffect, useState } from "react";
import "./Stripe.css";
import { useSelector } from "react-redux";

import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import authAxios from "../../utils/AuthAxios";
import { useNavigate } from "react-router-dom";

import stripeImageWhite from "../../assets/stripe_white.png";

export const StripeForm = ({ orderId, amount, paymentId }) => {
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [clientSecret, setClientSecret] = useState(null);

  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  const userId =
    useSelector((state) => state.authReducer.userId) ||
    localStorage.getItem("userId");

  // const makePayment = async () => {
  //   const stripe = await loadStripe("pk_test_51Pr8iUP1hmPqGb5E80BaSQip23AnQTU3ADvA57Nj5NUoAvyIVe8GnIsjMM49MXdoNl2HWfyndVdlNJRd41iSkpGd00SYwnGZ8x")
   
  //   const sessionId = await fetch("http://localhost:3399/payment", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       amount,
  //       orderId,
  //       userId,
  //       payType: "stripe",
  //     }),
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // console.log(data.data);
  //     // console.log(data.data.sessionId)
  //     return data.data.sessionId
  //   })
  //   .catch((error) => console.error("Error:", error));

  //   // console.log(sessionId);

  //   const result = await stripe.redirectToCheckout({
  //     sessionId: sessionId
  //   })

  //   // console.log(result)
  // }

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
      //put this here to prevent immediate redirect on success
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else {
      //success
      var res
      try {
        res = await authAxios.post(
          `http://localhost:3399/payment/stripe/paid`,
          { orderId, userId, paymentId }
        );
  
      } catch (err) {
        console.log(err)
      }
      if (res && res.status == 200) {
        // navigate("/shop/thankyou")
      } else {
        console.error("payment error")
      }
      
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }
  
  return (
    <form id="payment-form" onSubmit={handleSubmit}>

      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button className="StripeButton" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : `Pay $${amount}`}
        </span>
      </button>
      {/* Show any error or success messages */}
      {/* {message && <div className="payment-message" id="payment-message">{message}</div>} */}
    </form>
  )
  
  // return (<div id="stripeButtonContainer">
  //   <button className="StripeButton" onClick={makePayment}>
  //     <img className="StripeLogoButton" src={stripeImageWhite} alt="" />
  //   </button>
  // </div>)
};
