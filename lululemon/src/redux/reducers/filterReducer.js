// for all the filter reducers


import {actionTypes} from "../actions/actionTypes";

const initialState = {
    filters: {}
    // No need to set each initial value, it will dynamically add
    // Gender: [],
    // Category: [],
    // Type: [],
    // Color: [],
    // Activity: [],
    // Size: [],
    // SizeType: [],
    // Collection: [],
    // Features: [],
    // Climate: [],
    // Fabric: [],
}

export const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_FILTERS:
            return {
                ...state, filters: {
                    ...state.filters, [action.payload.filterType]: action.payload.filterValue
                }
            }
        case actionTypes.TOGGLE_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.filterType]: state.filters[action.payload.filterType].map(item => {
                            return item.name === action.payload.filterType.name ? {
                                ...item,
                                isChecked: action.payload.filterValue.isChecked
                            } : item
                        }
                    )
                }
            }
        default:
            return state
    }
}