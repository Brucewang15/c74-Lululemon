import { actionTypes } from "./actionTypes";
import axios from "axios";

export const setToken = (token) => {
  return {
    type: actionTypes.SET_TOKEN,
    payload: token,
  };
};

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    payload: user,
  };
};

export const loginSuccess = () => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const setUserId = (userId) => {
  return {
    type: actionTypes.SET_USERID,
    payload: userId,
  };
};

export const getAddressFromServer = (userId) => async (dispatch) => {
  const res = await axios.get(
    `http://localhost:3399/user/userInfo/${userId}/address`,
  );
  const shippingAddress = res.data.data.shippingAddress;
  console.log("shippingAddress from db ==>", shippingAddress);
  dispatch({
    type: actionTypes.GET_SHIPPING_ADDRESS,
    payload: shippingAddress,
  });
};
