// Fetch all the filter API

import axios from "axios";
import {apiURL, generalURL, myKey} from "../utils/helper";

import {actionTypes} from "./actionTypes";
import authAxios from "../../utils/AuthAxios";

export const fetchFilterApi = () => {
    return dispatch => {
        authAxios.post(`${generalURL}&mykey=${myKey}`)
            .then(res => {
                const filtersData = res.data.rs.filters;
                const productsData = res.data.rs.products;
                const pageParams = res.data.rs.pageParams;
                const totalProducts = pageParams.totalProducts;
                console.log(productsData);
                //console.log("FILTERS DATA ======", filtersData)

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
                    payload: { products: productsData, pageParams: pageParams }
                });

            })
            .catch(err => {
                console.error('error fetching filters and products', err)
            })
    }
}

export const fetchMoreProducts = () => {
    return (dispatch, getState) => {
        const state = getState().filterReducer;
        const { filters, pageParams } = state;
        const currentPage = pageParams.curPage || 1;
        const nextPage = currentPage + 1;
        console.log(nextPage);
        const requestBody = constructRequestBody(filters);

        authAxios.post(`${generalURL}page=${nextPage}&mykey=${myKey}`, requestBody)
            .then(res => {
                const productsData = res.data.rs.products;
                const newPageParams = res.data.rs.pageParams;
                dispatch({
                    type: actionTypes.ADD_MORE_PRODUCTS,
                    payload: { products: productsData, pageParams: newPageParams }
                });
            })
            .catch(err => {
                console.error('Error fetching more products', err);
            });
    };
};

export const setFilter = (filterType, filterValue) => {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.TOGGLE_FILTER,
            payload: {filterType, filterValue}
        });

        // Get the updated filter state
        const {filters} = getState().filterReducer;
        console.log(filters);
        const requestBody = constructRequestBody(filters);
        dispatch(postFilterRequest(requestBody));

    };
}

// 作用是当点击叉叉的时候就可以让它反选这个filter，取消选项
export const handleRemoveFilter = (filterType, filterId) => {

    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.TOGGLE_FILTER,
            payload: {
                filterType,
                filterValue: {id: filterId}
            }
        });

        const {filters} = getState().filterReducer;
        console.log(filters);

        const requestBody = constructRequestBody(filters);
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
        authAxios.post(apiURL, requestBody)
            .then(res => {
                const productsData = res.data.rs.products;
                const newPageParams = res.data.rs.pageParams;
                dispatch({
                    type: actionTypes.FETCH_FILTERED_PRODUCTS,
                    payload: { products: productsData, pageParams: newPageParams }
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

export const setSortingOption = (sortingOption) => {
    return (dispatch, getState) => {
        console.log("enter set sorting options", sortingOption);
        dispatch({
            type: actionTypes.UPDATE_SORTING,
            payload: sortingOption
        });

        // Get the updated filters state
        const { filters } = getState().filterReducer;
        // const requestBody = constructRequestBody(sortingOption);

        // Fetch sorted products
        dispatch(fetchSortedProducts(sortingOption, filters, 1));
    };
};

export const fetchSortedProducts = (sortingOption, filters) => {
    return (dispatch, getState) => {
        const state = getState();
        const products = state.filterReducer.products;

        if (sortingOption === 'Price: High to Low' || sortingOption === 'Price: Low to High') {
            let sortedProducts = [...products];
            sortedProducts.sort((a, b) => {
                const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g,""));
                const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g,""));
                if (sortingOption === 'Price: High to Low') {
                    return priceB - priceA;
                } else {
                    return priceA - priceB;
                }
            });

            dispatch({
                type: actionTypes.FETCH_FILTERED_PRODUCTS,
                payload: {products: sortedProducts, pageParams: state.filterReducer.pageParams}
            });
        } else {
            const sortingId = getSortingId(sortingOption);
            const requestBody = constructRequestBody(filters);
            authAxios.post(`${generalURL}sortingId=${sortingId}&mykey=${myKey}`, requestBody)
                .then(res => {
                    const productsData = res.data.rs.products;
                    const pageParams = res.data.rs.pageParams;
                    dispatch({
                        type: actionTypes.FETCH_FILTERED_PRODUCTS,
                        payload: { products: productsData, pageParams: pageParams }
                    });
                })
                .catch(err => {
                    console.error('Error fetching sorted products', err);
                });
        }
    };
};

const getSortingId = (sortingOption) => {
    switch (sortingOption) {
        case 'Featured':
            return 1;
        case 'New Arrivals':
            return 2;
        case 'Top Rated':
            return 3;
        default:
            return 1;
    }
};


