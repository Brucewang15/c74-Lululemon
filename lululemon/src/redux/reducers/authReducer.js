import {actionTypes} from "../actions/actionTypes";

const initialState = {
    token: '',
    user: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TOKEN:
            return {
                ...state, token: action.payload
            }
        case actionTypes.SET_USER:
            return {
                ...state, user: action.payload
            }
        default:
            return state
    }
}