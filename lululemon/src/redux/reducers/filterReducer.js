// for all the filter reducers


import {actionTypes} from "../actions/actionTypes";

const initialState = {
    filters: {
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
}

export const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_FILTERS:
            console.log(`Fetching filters for type: ${action.payload.filterType}`);

            return {
                ...state,
                filters: {
                    ...state.filters, [action.payload.filterType]: action.payload.filterValues
                }
            }
        case actionTypes.TOGGLE_FILTER:
            console.log(`Toggling filter: ${action.payload.filterValue.id || action.payload.filterValue.name}`);

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.filterType]: state.filters[action.payload.filterType].map(item =>
                        // use the unique id to select an individual filter
                        item.id === action.payload.filterValue.id
                            ? {
                                ...item,
                                isChecked: action.payload.filterValue.isChecked
                            } : item
                    )
                }
            }
        default:
            return state
    }
}