// Fetch all the filter API

import axios from "axios";
import {filterURL, productURL, myKey, apiURL} from "../helper";
import {actionTypes} from "./actionTypes";

export const fetchFilterApi = () => {
    return dispatch => {
        axios.post(apiURL)
            .then(res => {
                const filtersData = res.data.rs.filters;
                const productsData = res.data.rs.products;
                console.log("FILTERS DATA ======", filtersData)

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

                // Update products
                dispatch({
                    type: actionTypes.FETCH_FILTERED_PRODUCTS,
                    payload: productsData
                });

            })
            .catch(err => {
                console.error('error fetching filters and products', err)
            })
    }
}

export const setFilter = (filterType, filterValue) => {
    // return {
    //     type: actionTypes.TOGGLE_FILTER,
    //     payload: {filterType, filterValue}
    // }
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.TOGGLE_FILTER,
            payload: {filterType, filterValue}
        });

        // Get the updated filter state
        const {filters} = getState().filterReducer;
        console.log(filters);
        // Construct the request body from the filters state
        const requestBody = constructRequestBody(filters);
        //console.log('Request Body:', JSON.stringify(requestBody, null, 2));

        // Dispatch the action to fetch filtered products
        //dispatch(postFilterRequest(filters));
        dispatch(postFilterRequest(requestBody));

    };
}

// 作用是当点击叉叉的时候就可以让它反选这个filter，取消选项
export const handleRemoveFilter = (filterType, filterId) => {

    // return {
    //     type: actionTypes.TOGGLE_FILTER,
    //     payload: {
    //         filterType,
    //         filterValue: {id: filterId}
    //     }
    // }
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.TOGGLE_FILTER,
            payload: {
                filterType,
                filterValue: {id: filterId}
            }
        });

        // Get the updated filter state
        const {filters} = getState().filterReducer;
        console.log(filters);

        // Construct the request body from the filters state
        const requestBody = constructRequestBody(filters);

        // Dispatch the action to fetch filtered products
        //dispatch(postFilterRequest(filters));
        dispatch(postFilterRequest(requestBody));
    };
}
export const expandFilter = (filterType) => {
    return {
        type: actionTypes.FILTER_EXPAND,
        payload: filterType
    }
}


export const viewMoreFilter = (filterType) => {
    return {
        type: actionTypes.FILTER_VIEW_MORE,
        payload: filterType
    }
}


export const removeFilters = () => {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.REMOVE_FILTERS,
        });

        const { filters } = getState().filterReducer;
        const requestBody = constructRequestBody(filters);
        dispatch(postFilterRequest(requestBody));
    }
};

export const selectTab = (tabName) => {
    return {
        type: actionTypes.SELECT_TAB,
        payload: tabName
    }
}

export const postFilterRequest = (requestBody) => {
    console.log(requestBody);
    return dispatch => {
        axios.post(apiURL, requestBody)
            .then(res => {
                dispatch({
                    type: actionTypes.FETCH_FILTERED_PRODUCTS,
                    payload: res.data.rs.products
                });
            })
            .catch(err => {
                console.error('error fetching filtered products', err);
            });
    };
};

export const constructRequestBody = (filters) => {
    let requestBody = {};

    Object.keys(filters).forEach(key => {
        requestBody[key] = filters[key].map(filter => {
            let filterItem = {};

            if (filter.name) {
                filterItem.name = filter.name;
            }

            if (filter.swatch) {
                filterItem.swatch = filter.swatch;
            }
            if (filter.alt) {
                filterItem.alt = filter.alt;
            }

            filterItem.isChecked = filter.isChecked;

            return filterItem;
        });
    });

    return requestBody;

};


