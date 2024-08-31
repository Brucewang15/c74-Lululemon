import { FETCH_WISHLIST, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, WISHLIST_ERROR } from '../actions/wishlistAction';

const initialState = {
    wishlist: {
        products: []
    },
    error: null
};

export const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WISHLIST:
            return {
                ...state,
                wishlist: {
                    ...state.wishlist,
                    products: action.payload
                },
                error: null,
            };
        case ADD_TO_WISHLIST:
            return {
                ...state,
                wishlist: {
                    ...state.wishlist,
                    products: [...state.wishlist.products, action.payload]
                },
                error: null,
            };
        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
                wishlist: {
                    ...state.wishlist,
                    products: state.wishlist.products.filter(product => product.productId !== action.payload)
                },
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

