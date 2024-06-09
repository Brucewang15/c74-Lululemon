// Here is to configure all the Redux store


//Create Store
import {applyMiddleware, createStore} from "redux";
import {thunk} from "redux-thunk";
import {reducer} from "../reducers";

export const reduxStore = createStore(reducer, applyMiddleware(thunk))