// Here combine all the reducers

import {combineReducers} from "redux";
import {filterReducer} from "./filterReducer";
import {productReducer} from "./productReducer";
import {reviewsReducer} from "./reviewsReducer";

export const reducer = combineReducers({
    filterReducer,
    productReducer,
    reviewsReducer,
    // Other reducers...
})
