import {actionTypes} from "./actionTypes";
import axios from "axios";

export const changeQuantity = (newQuantity, index) => {
    return {
        type: actionTypes.CHANGE_QUANTITY,
        payload: {
            newQuantity,
            index
        }

    }
}

export const removeProduct = (productID, selectedSize, selectedColorId) => {
    return {
        type: actionTypes.REMOVE_PRODUCTS,
        payload: {productID, selectedSize, selectedColorId}
    }
}
// test to add new items, Whitney you can delete this later

export const addItems = (product) => {
    return {
        type: actionTypes.ADD_ITEMS,
        payload: product
    }
}
export const fetchCartSuccess = (cartItems) => ({
    type: actionTypes.FETCH_CART_SUCCESS,
    payload: cartItems,
});

export const fetchCartFailure = (error) => ({
    type: actionTypes.FETCH_CART_ERROR,
    payload: error,
});
export const fetchCartItems = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:8000/cart');
        console.log(response.data);
        dispatch(fetchCartSuccess(response.data));
    } catch (error) {
        dispatch(fetchCartFailure(error));
    }
}

