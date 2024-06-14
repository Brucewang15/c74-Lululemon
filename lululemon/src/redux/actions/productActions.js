import {filterURL, myKey, productURL} from "../helper";
import {actionTypes} from "./actionTypes";
import axios from 'axios';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const FETCH_FILTERS_SUCCESS = 'FETCH_FILTERS_SUCCESS';

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



export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
});

export const fetchProductsFailure = (error) => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
});

export const fetchFiltersSuccess = (filters) => ({
    type: FETCH_FILTERS_SUCCESS,
    payload: filters,
});

export const fetchProducts = () => {
    return async (dispatch) => {
        dispatch(fetchProductsRequest());
        try {
            const response = await axios.post(productURL);
            dispatch(fetchProductsSuccess(response.data.rs.products));
            dispatch(fetchFiltersSuccess(response.data.rs.filters));
        } catch (error) {
            dispatch(fetchProductsFailure(error.message));
        }
    };
};