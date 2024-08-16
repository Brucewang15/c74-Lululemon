import { actionTypes } from "../actions/actionTypes";

const initialState = {
  token: "",
  user: null,
  loginStatus: false,
  shippingAddress: [],
  userId: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loginStatus: true,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        loginStatus: false,
      };
    case actionTypes.SET_USERID:
      return { ...state, userId: action.payload };

    case actionTypes.GET_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    default:
      return state;
  }
};
