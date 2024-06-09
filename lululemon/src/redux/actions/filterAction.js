// Fetch all the filter API

import axios from "axios";
import {useDispatch} from "react-redux";
import {APIURL} from "../helper";
import {actionTypes} from "./actionTypes";

export const fetchFilterApi = () => {
    return dispatch => {
        axios.get(APIURL)
            .then(res => {
                const filtersData = res.data.rs;
                console.log(filtersData)

                Object.keys(filtersData).forEach(filterType => {
                    dispatch({
                        type: actionTypes.FETCH_ALL_FILTERS,
                        payload: {filterType, filterValue: filtersData[filterType]}
                    })
                })

            })
            .catch(err => {
                console.error('error fetching filters', err)
            })
    }
}

export const setFilter = (filterType, filterValue) => {
    return {
        type: actionTypes.TOGGLE_FILTER,
        payload: {filterType, filterValue}
    }
}