import {actionTypes} from "./actionTypes";
import axios from "axios";

// export const changeQuantity = (newQuantity, index) => {
//     return {
//         type: actionTypes.CHANGE_QUANTITY,
//         payload: {
//             newQuantity,
//             index
//         }
//
//     }
// }
export const changeQuantity = (newQuantity, index, itemId) => async dispatch => {
    try {
        const response = await axios.post(`http://localhost:8000/cart/update/${itemId}`, {quantity: newQuantity});
        dispatch({
            type: actionTypes.CHANGE_QUANTITY,
            payload: {
                newQuantity,
                index
            }
        });
    } catch (error) {
        console.error("Error updating quantity:", error);
        // 可以在此处添加错误处理逻辑
    }
};

export const removeProduct = (itemId, selectedSize, selectedColorId) => {
    return {
        type: actionTypes.REMOVE_PRODUCTS,
        // payload: {productID, selectedSize, selectedColorId}
        payload: {itemId, selectedSize, selectedColorId}

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

