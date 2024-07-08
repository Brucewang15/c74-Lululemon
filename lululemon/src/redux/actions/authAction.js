import {actionTypes} from "./actionTypes";

export const setToken = (token) => {
    return {
        type: actionTypes.SET_TOKEN,
        payload: token,
    }
}

export const setUser = (user) => {
    return {
        type: actionTypes.SET_USER,
        payload: user
    }
}

export const loginSuccess = () => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
    }
}