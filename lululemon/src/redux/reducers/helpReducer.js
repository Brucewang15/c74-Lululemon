import {
    SET_UPLOADING,
    SET_HELP_OPEN,
    SET_HELP_ACTIVITY,
    SET_SUGGESTED_PRODUCTS,
} from '../actions/helpAction';


const initialState = {
    isUploading: false,
    isHelpOpen: false,
    lastActivity: "Choose",
    suggestedProducts: [],
}

export const helpReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_UPLOADING:
            return {
                ...state, isUploading: action.payload
            };
        case SET_HELP_OPEN:
            return {
                ...state, isHelpOpen: action.payload
            };
        case SET_HELP_ACTIVITY:
            return {
                ...state, lastActivity: action.payload
            };
        case SET_SUGGESTED_PRODUCTS:
            return {
                ...state, suggestedProducts: action.payload
            };
        default:
            return state
    }
}