import {actionTypes} from "./actionTypes";

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

