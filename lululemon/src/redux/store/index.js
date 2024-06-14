// Here is to configure all the Redux store


//Create Store
// import {applyMiddleware, createStore} from "redux";
// import {thunk} from "redux-thunk";
// import {reducer} from "../reducers";
//
// export const reduxStore = createStore(reducer, applyMiddleware(thunk))

import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { filterReducer } from '../reducers/filterReducer';
import { productReducer } from '../reducers/productReducer';

const rootReducer = combineReducers({
    filterReducer,
    productReducer
});

export const reduxStore = createStore(rootReducer, applyMiddleware(thunk));
