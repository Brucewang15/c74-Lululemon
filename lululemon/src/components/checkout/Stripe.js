import { useEffect, useState } from "react";
import "./Stripe.css";
import { useSelector } from "react-redux";


import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

import stripeImageWhite from "../../assets/stripe_white.png";
import { Elements } from "@stripe/react-stripe-js";
import { StripeForm } from "./StripeForm";
import authAxios from "../../utils/AuthAxios";

export const Stripe = ({ orderId, amount }) => {

  const stripePromise = loadStripe("pk_test_51Pr8iUP1hmPqGb5E80BaSQip23AnQTU3ADvA57Nj5NUoAvyIVe8GnIsjMM49MXdoNl2HWfyndVdlNJRd41iSkpGd00SYwnGZ8x")
  
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentId, setPaymentId] = useState(null);

  const userId =
    useSelector((state) => state.authReducer.userId) ||
    localStorage.getItem("userId");


  useEffect(() => {
    
    const loadStripe = async () => {
      const response = await authAxios.post(
        `http://localhost:3399/payment/stripe`,
        { orderId, userId }
      );
      const { clientSecret, paymentId } = response.data.data;

      setClientSecret(clientSecret)
      setPaymentId(paymentId)
    }

    loadStripe();
  }, []);
  



  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  
  return (
    clientSecret && <Elements options={options} stripe={stripePromise}>
      <StripeForm clientSecret={clientSecret} paymentId={paymentId} amount={amount}/>
    </Elements>
  )
  
  // return (<div id="stripeButtonContainer">
  //   <button className="StripeButton" onClick={makePayment}>
  //     <img className="StripeLogoButton" src={stripeImageWhite} alt="" />
  //   </button>
  // </div>)
};
