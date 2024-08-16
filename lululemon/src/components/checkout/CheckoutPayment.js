import {ShoppingCartHeader} from "../shoppingcart/ShoppingCartHeader";
import {ShoppingCartFooter} from "../shoppingcart/ShoppingCartFooter";


import { useState } from 'react'

import {loadStripe} from '@stripe/stripe-js';
import {useSelector} from "react-redux";



export const CheckoutPayment = () => {

    const shoppingCart = useSelector(
        (state) => state.shoppingCartReducer.shoppingCart,
    );


    return <>

        <ShoppingCartHeader/>

        <ShoppingCartFooter/>

    </>


}