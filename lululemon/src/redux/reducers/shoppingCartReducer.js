import fakeCartData from '../../components/shoppingcart/fakeCartData.json'
import {actionTypes} from "../actions/actionTypes";


const initialState = {
    // shoppingCart: calStorage.getItem('shoppingCart')) || fakeCartData.cartItemsJSON.parse(lo
    // shoppingCart: fakeCartData.cartItems
    // shoppingCart: []     // 模拟空购物车
    shoppingCart: JSON.parse(localStorage.getItem('shoppingCart')) || [],
    error: null,
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
        case actionTypes.EDIT_CART:
            const editedCart = state.shoppingCart.map((item, index) => {
                return index === action.payload.index
                    ? {...item, size: action.payload.newSize, colorId: action.payload.newColorId}
                    : item
            })
            localStorage.setItem('shoppingCart', JSON.stringify(editedCart));
            return {
                ...state,
                shoppingCart: editedCart
            }
        case actionTypes.MERGE_CART_ITEMS:
            const mergedCart = state.shoppingCart.map((item, idx) => {
                if (idx === action.payload.existingItemIndex) {
                    return {...item, quantity: action.payload.updatedQuantity};
                }
                return item;
            }).filter((_, idx) => idx !== action.payload.index);
            localStorage.setItem('shoppingCart', JSON.stringify(mergedCart));

            return {
                ...state,
                shoppingCart: mergedCart
            };
        case actionTypes.REMOVE_PRODUCTS:
            // deal with filter out the selected product, but also filter same product with different size OR same product with different colors
            // const newCart = state.shoppingCart.filter(product => product._id !== action.payload.itemId || (product._id === action.payload.itemId && product.selectedSize !== action.payload.selectedSize) || (product._id === action.payload.itemId && product.selectedColorId !== action.payload.selectedColorId))

            const newCart = state.shoppingCart.filter(product => product._id !== action.payload.itemId);
            localStorage.setItem('shoppingCart', JSON.stringify(newCart));
            return {...state, shoppingCart: newCart}
        // test to add new items, Whitney you can delete this later
        case actionTypes.ADD_ITEMS:
            const addedCart = [...state.shoppingCart, action.payload]
            return {...state, shoppingCart: addedCart}
        case actionTypes.FETCH_CART_SUCCESS:
            localStorage.setItem('shoppingCart', JSON.stringify(action.payload));

            return {
                ...state,
                shoppingCart: action.payload,
                error: null,
            };
        case actionTypes.FETCH_CART_ERROR:
            return {
                ...state,
                shoppingCart: [],
                error: action.payload,
            };
        default:
            return state
    }
}