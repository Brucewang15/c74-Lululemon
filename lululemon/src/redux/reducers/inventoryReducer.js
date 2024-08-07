import {actionTypes} from "../actions/actionTypes";


const initialState = {
    inventory: []
}

export const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_INVENTORY:
            return {
                ...state, inventory: action.payload
            };
        default:
            return state
    }
}