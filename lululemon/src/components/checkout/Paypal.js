import {useEffect} from "react";
import {paypalClientID} from "../../redux/utils/helper";
import "./Paypal.css";
import {useSelector} from "react-redux";

export const Paypal = ({orderId, amount}) => {

    const userId =
      useSelector((state) => state.authReducer.userId) ||
      localStorage.getItem("userId");

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientID}&currency=USD`;
        script.setAttribute("data-namespace", "paypal_sdk");
        script.async = true;

        script.onload = () => {
          window.paypal_sdk
            .Buttons({
              components: "buttons",
              style: {
                color: "blue",
                shape: "rect",
                // layout: 'vertical',
                label: "paypal",
              },
              fundingSource: window.paypal.FUNDING.PAYPAL,

              createOrder: (data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: amount,
                      }
                    }
                  ]
                })
              },
              onApprove: (data, actions) => {
                return actions.order.capture().then((details) => {
                  // Send payment details to backend
                  fetch("http://localhost:3399/payment", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      amount,
                      orderId,
                      userId
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((error) => console.error("Error:", error));
                });
              },
            })
            .render("#paypalButtonContainer");
        };
        document.body.appendChild(script);
      }, []);

    return <div id="paypalButtonContainer"></div>;
  }

