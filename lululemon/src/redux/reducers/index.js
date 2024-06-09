// Here combine all the reducers

import {combineReducers} from "redux";
import {filterReducer} from "./filterReducer";

export const reducer = combineReducers({
    filterReducer,
    // Other reducers...
})
