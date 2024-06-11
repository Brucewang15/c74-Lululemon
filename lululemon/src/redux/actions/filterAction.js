// Fetch all the filter API

import axios from "axios";
import {filterURL, myKey} from "../helper";
import {actionTypes} from "./actionTypes";

export const fetchFilterApi = () => {
    return dispatch => {
        axios.get(filterURL)
            .then(res => {
                const filtersData = res.data.rs;
                console.log(filtersData)

                Object.keys(filtersData).forEach(filterType => {
                    const filterValues = filtersData[filterType].map((filter, index) => ({
                        ...filter,
                        id: filter.id || `${filterType}-${index}`,
                        name: filter.name || null,
                        swatch: filter.swatch || null,
                        isChecked: filter.isChecked || false
                    }))

                    dispatch({
                        type: actionTypes.FETCH_ALL_FILTERS,
                        payload: {filterType, filterValues}
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

export const expandFilter = (filterType) => {
    return {
        type: actionTypes.FILTER_EXPAND,
        payload: filterType
    }
}