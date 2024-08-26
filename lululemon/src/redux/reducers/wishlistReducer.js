import { FETCH_WISHLIST, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, WISHLIST_ERROR } from '../actions/wishlistAction';

const initialState = {
    products: []
};

export const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WISHLIST:
            return {
                ...state,
                products: action.payload,
                error: null,
            };
        case ADD_TO_WISHLIST:
            return {
                ...state,
                products: [...state.products, action.payload],
                error: null,
            };
        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload),
                error: null,
            };
        case WISHLIST_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

