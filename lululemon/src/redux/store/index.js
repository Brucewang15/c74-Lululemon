// Here is to configure all the Redux store

//Create Store
// import {applyMiddleware, createStore} from "redux";
// import {thunk} from "redux-thunk";
// import {reducer} from "../reducers";
//
// export const reduxStore = createStore(reducer, applyMiddleware(thunk))

import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { filterReducer } from "../reducers/filterReducer";
import { productReducer } from "../reducers/productReducer";
import { reviewsReducer } from "../reducers/reviewsReducer";
import { shoppingCartReducer } from "../reducers/shoppingCartReducer";
import { authReducer } from "../reducers/authReducer";
import { inventoryReducer } from "../reducers/inventoryReducer";
import { helpReducer } from "../reducers/helpReducer";
import { wishlistReducer } from "../reducers/wishlistReducer";

const rootReducer = combineReducers({
  filterReducer,
  productReducer,
  reviewsReducer,
  shoppingCartReducer,
  inventoryReducer,
  helpReducer,
  authReducer,
  wishlistReducer
});

export const reduxStore = createStore(rootReducer, applyMiddleware(thunk));
