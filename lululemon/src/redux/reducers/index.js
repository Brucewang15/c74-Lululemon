// Here combine all the reducers

import {combineReducers} from "redux";
import {filterReducer} from "./filterReducer";
import {productReducer} from "./productReducer";
import {inventoryReducer} from "./inventoryReducer";
import {reviewsReducer} from "./reviewsReducer";
import {shoppingCartReducer} from "./shoppingCartReducer";

export const reducer = combineReducers({
    filterReducer,
    productReducer,
    inventoryReducer,
    reviewsReducer,
    shoppingCartReducer
    // Other reducers...
})
