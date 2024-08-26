import axios from 'axios';
import {serverAPI} from "../utils/helper";

// Define action types
export const FETCH_WISHLIST = 'FETCH_WISHLIST';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
export const WISHLIST_ERROR = 'WISHLIST_ERROR';

// Action to fetch the wishlist
export const fetchWishlist = () => async (dispatch, getState) => {
    try {
        const { user } = getState().authReducer;
        if (user) {
            const response = await axios.get(`${serverAPI}/wishlist/${user.userId}`);
            dispatch({
                type: FETCH_WISHLIST,
                payload: response.data,
            });
        }
    } catch (error) {
        dispatch({
            type: WISHLIST_ERROR,
            payload: error.response ? error.response.data : { message: 'Error fetching wishlist' },
        });
    }
};

// Action to add a product to the wishlist
export const addToWishlist = (product) => async (dispatch, getState) => {
    try {
        const { user } = getState().authReducer;
        console.log(user);
        if (user) {
            const response = await axios.post(`${serverAPI}/wishlist/add/${user.id}`, product);
            dispatch({
                type: ADD_TO_WISHLIST,
                payload: response.data,
            });
        }
    } catch (error) {
        dispatch({
            type: WISHLIST_ERROR,
            payload: error.response ? error.response.data : { message: 'Error adding to wishlist' },
        });
    }
};

// Action to remove a product from the wishlist
export const removeFromWishlist = (productId) => async (dispatch, getState) => {
    try {
        const { user } = getState().authReducer;
        if (user) {
            await axios.delete(`/api/wishlist/remove/${user.id}/${productId}`);
            dispatch({
                type: REMOVE_FROM_WISHLIST,
                payload: productId,
            });
        }
    } catch (error) {
        dispatch({
            type: WISHLIST_ERROR,
            payload: error.response ? error.response.data : { message: 'Error removing from wishlist' },
        });
    }
};