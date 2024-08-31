import authAxios from "../../utils/AuthAxios";
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

export const fetchAddressList = (userId) => async (dispatch) => {
  const res = await authAxios.get(
    `http://localhost:3399/user/userInfo/${userId}/address`,
  );
  const shippingAddress = res.data.data.shippingAddress;
  console.log("shippingAddress from db ==>", shippingAddress);
  dispatch({
    type: actionTypes.GET_SHIPPING_ADDRESS,
    payload: shippingAddress,
  });
};

export const editAddress =
  (userId, addressId, newAddress) => async (dispatch) => {
    try {
      await authAxios.put(
        `http://localhost:3399/user/userInfo/${userId}/address/${addressId}`,
        newAddress,
      );
      dispatch(fetchAddressList(userId));
    } catch (e) {
      console.log("updating user address failed", e);
    }
  };

export const selectAnAddress = (addressId) => {
  return {
    type: actionTypes.SELECT_ADDRESS,
    payload: addressId,
  };
};
