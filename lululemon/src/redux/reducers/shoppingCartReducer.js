import fakeCartData from '../../components/shoppingcart/fakeCartData.json'
import {actionTypes} from "../actions/actionTypes";


const initialState = {
    shoppingCart: JSON.parse(localStorage.getItem('shoppingCart')) || fakeCartData.cartItems
    // shoppingCart: []     // 模拟空购物车
}

export const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_QUANTITY :
            const updatedCart = state.shoppingCart.map((item, index) => {
                return index === action.payload.index ? {...item, quantity: action.payload.newQuantity}
                    : item
            })
            localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
            return {
                ...state,
                shoppingCart: updatedCart
            }
        default:
            return state
    }
}