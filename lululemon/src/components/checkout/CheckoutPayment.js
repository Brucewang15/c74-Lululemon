import {ShoppingCartHeader} from "../shoppingcart/ShoppingCartHeader";
import {ShoppingCartFooter} from "../shoppingcart/ShoppingCartFooter";


import { useState } from 'react'

import {loadStripe} from '@stripe/stripe-js';
import {useSelector} from "react-redux";



export const CheckoutPayment = () => {

    const shoppingCart = useSelector(
        (state) => state.shoppingCartReducer.shoppingCart,
    );

    const makePayment = async () => {

        const stripe = await loadStripe('pk_test_51PnMZjIsvOFHvBvCO3hpgLRwd5oJSwBsUz0P11DOs3cQsYGMjiFQsdT1opFFeJZmHbxX2eOuWFqT4SAKkINTNJRi00vpdvOXdh');

        const body = {
            products: shoppingCart
        }
        const headers = {
            'Content-type': "application/json"
        }
        const response = await fetch('localhost:3399/create-checkout-sessions', {

            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)

            })

        const sessions = await response.json()
        const result = stripe.redirectToCheckout({
            sessionId:sessions.id
        })
        if (result.error) {
            console.log(result.error)
        }
    }
    return <>

        <ShoppingCartHeader/>

        <ShoppingCartFooter/>

    </>


}