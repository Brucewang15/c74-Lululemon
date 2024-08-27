import { useEffect } from "react";
import "./Stripe.css";
import { useSelector } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";





import stripeImageWhite from "../../assets/stripe_white.png";

export const Stripe = ({ orderId, amount }) => {

  amount = Math.round(amount)
  const userId =
    useSelector((state) => state.authReducer.userId) ||
    localStorage.getItem("userId");


  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51PnMZjIsvOFHvBvCO3hpgLRwd5oJSwBsUz0P11DOs3cQsYGMjiFQsdT1opFFeJZmHbxX2eOuWFqT4SAKkINTNJRi00vpdvOXdh")
    console.log("key is ok")



    const sessionId = await fetch("http://localhost:3399/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.STRIPE_SECRERT}`
      },
      body: JSON.stringify({
        amount,
        orderId,
        userId,
        payType: "stripe",
      }),
    })


        .then((response) => {

          console.log(JSON.stringify(response), "response")
          return response.json()
        }
        )
        .then((data) => {
          console.log("first", data.data.sessionId);
          return data.data.sessionId
        })
        .catch((error) => console.error("Error:", error));
    // .then((response) => {
    //   console.log(response, "response")
    //
    //   if (response.ok) return response.json()
    //
    //   return response.json().then(json => Promise.reject(json))})
    //
    //
    //
    // .then((data) => {
    //   console.log("first", data.sessionId);
    //   console.log("second", data.data.sessionId)
    //   return data.data.sessionId
    // })
    //     .then(({ url}) => {
    //       console.log("url: ", url)
    //     })
    // .catch((error) => console.error("Error1:", error));


    // console.log(sessionId);

    console.log("sessionId", sessionId)
    const result = await stripe.redirectToCheckout({
      sessionId: sessionId
    })

    if (result.error) {
      console.error("result error", result.error.message);
    }

    // console.log(result)
  }

  
  return (<div id="stripeButtonContainer">
    <button className="StripeButton" onClick={makePayment}>
      <img className="StripeLogoButton" src={stripeImageWhite} alt="" />
    </button>
  </div>)
};
