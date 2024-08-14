// Here combine all the reducers

import {combineReducers} from "redux";
import {filterReducer} from "./filterReducer";
import {productReducer} from "./productReducer";
import {reviewsReducer} from "./reviewsReducer";
import {shoppingCartReducer} from "./shoppingCartReducer";
import { helpReducer } from "./helpReducer";

export const reducer = combineReducers({
    filterReducer,
    productReducer,
    reviewsReducer,
    helpReducer,
    shoppingCartReducer
    // Other reducers...
})
