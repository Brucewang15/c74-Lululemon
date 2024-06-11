import axios from "axios";
import {filterURL, myKey, productURL} from "../helper";
import {actionTypes} from "./actionTypes";

export const postFilterRequest = (requestBody) => {
    return dispatch => {
        console.log('Request Body : ', JSON.stringify(requestBody))
        axios.post(productURL, requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.data.rs && res.data.rs.products) {
                    console.log('Products got from Post:', res.data.rs.products)
                    dispatch({
                        type: actionTypes.SET_PRODUCTS,
                        // payload: res.data.rs.products
                        payload: res.data.rs.product
                    });
                } else {
                    console.log('No products found in the response')
                }
            })
            .catch((err) => {
                console.error('Error fetching products', err)
                if (err.response) {
                    console.error("response data:", err.response.data)
                    console.error("response status:", err.response.status)
                    console.error("response headers:", err.response.headers)
                }
            })
    };
};