import {useEffect} from 'react'
import {paypalClientID} from "../../redux/utils/helper"
import './Paypal.css'

const orderDetails = {
    "orderId": "A1",
    "amount": {
        "currency": "USD",
        "total": "1.00"
    },
    "description": "User order."
}


export const Paypal = ({amount}) => {


    useEffect(() => {
        const script = document.createElement('script')
        script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientID}&currency=USD`
        script.setAttribute('data-namespace', 'paypal_sdk')
        script.async = true
        console.log('e1')
        script.onload = () => {
            window.paypal_sdk.Buttons({
                components: 'buttons',
                style: {
                    color: 'blue',
                    shape: 'rect',
                    // layout: 'vertical',
                    label: 'paypal'
                },
                fundingSource: window.paypal.FUNDING.PAYPAL,
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: amount  // Change this to the actual amount
                            }
                        }]
                    })
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then((details) => {
                        // Send payment details to backend
                        fetch('http://localhost:3399/payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(orderDetails)
                        }).then(response => response.json())
                            .then(data => console.log(data))
                            .catch(error => console.error('Error:', error))
                    })
                }
            }).render('#paypalButtonContainer')
        }
        document.body.appendChild(script)
    }, [])

    return <div id="paypalButtonContainer"></div>
}
