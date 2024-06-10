import {actionTypes} from "../actions/actionTypes";

const initialState = {
    products: []
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PRODUCTS:
            return {
                ...state, products: action.payload
            }
        default:
            return state
    }
}