import {
    SET_HELP_OPEN,
    SET_HELP_ACTIVITY,
} from '../actions/helpAction';


const initialState = {
    isHelpOpen: false,
    lastActivity: "Choose",
}

export const helpReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HELP_OPEN:
            return {
                ...state, isHelpOpen: action.payload
            };
        case SET_HELP_ACTIVITY:
            return {
                ...state, lastActivity: action.payload
            };
        default:
            return state
    }
}