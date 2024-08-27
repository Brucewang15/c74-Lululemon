
import axios from 'axios'
import { useDispatch } from 'react-redux';
import {apiURL, generalURL, myKey} from "../utils/helper";
import authAxios from '../../utils/AuthAxios';


export const SET_UPLOADING = 'SET_UPLOADING'
export const SET_HELP_OPEN = 'SET_HELP_OPEN'
export const SET_HELP_ACTIVITY = 'SET_HELP_ACTIVITY'
export const SET_SUGGESTED_PRODUCTS = 'SET_SUGGESTED_PRODUCTS'
export const SET_CHAT_INPUT = 'SET_CHAT_INPUT'

export const setUploading = (value) => (dispatch, getState) => {
    dispatch({
        type: SET_UPLOADING,
        payload: value,
    });
};

export const setHelpOpen = (value) => (dispatch, getState) => {
    dispatch({
        type: SET_HELP_OPEN,
        payload: value,
    });
};

export const setHelpActivity = (value) => (dispatch, getState) => {
    dispatch({
        type: SET_HELP_ACTIVITY,
        payload: value,
    });
};

// export const setSuggestedProducts = (value) => (dispatch, getState) => {
//     dispatch({
//         type: SET_SUGGESTED_PRODUCTS,
//         payload: value,
//     });
// };



export const fetchProductsFromIds = (prodIds) => {
    return async (dispatch, getState) => {
        const state = getState();

        const products = []

        // console.log(prodIds)

        const promises = []
        for (let i = 0; i < prodIds.length; i++) {
            const prodId = prodIds[i]
            const promise = authAxios.get(`http://api-lulu.hibitbyte.com/product/${prodId}?mykey=${myKey}`)

            promises.push(promise)
        }

        const responses = await Promise.all(promises)

        for (let i = 0; i < responses.length; i++) {
            const res = responses[i]
            if (res.err) {
                console.error('Error fetching product', res.err);
            } else {
                // console.log(res)
                products.push(res.data.rs)
            }
        }

        // console.log(products)

        dispatch({
            type: SET_SUGGESTED_PRODUCTS,
            payload: products,
        });

    };
};



const formatResults = (res) => {
    const validResults = []

    for (let i = 0; i < res.data.length; i++) {
        const id = res.data[i].product.name.split('/').at(-1)
        const score = res.data[i].score
        if (score > 0.4) {
            validResults.push(id)
        }
    }

    var topScore = 0
    var topScoreIndex = -1
    if (validResults.length == 0) {
        for (let i = 0; i < res.data.length; i++) {
            const score = res.data[i].score
            if (score > 0.1 && score > topScore) {
                topScoreIndex = i
                topScore = score
            }
        }

        if (topScoreIndex >= 0) {
            const id = res.data[topScoreIndex].product.name.split('/').at(-1)
            validResults.push(id)
        }
    }

    return validResults
}

export const searchImageURL = (url) => {

    // console.log(url)
    const requestBody = {image_uri: url}

    return async (dispatch, getState) => {
        const res = await authAxios.post(`http://localhost:3399/image-ai/search/uri`, requestBody, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        
        if (res.err) {
            console.error('Image search failed: ', res.err)
        } else {

            await dispatch(fetchProductsFromIds(formatResults(res)))
        }
    }
}

export const searchImage = (image) => {
    return async (dispatch, getState) => {
        const res = await authAxios.post(`http://localhost:3399/image-ai/search/img`, image, {
            headers: {
                "Content-Type": "image/png",
            }
        })
        
        if (res.err) {
            console.error('Image search failed: ', res.err)
        } else {

            await dispatch(fetchProductsFromIds(formatResults(res)))
        }
    }
}