import { actionTypes } from "../actions/actionTypes";

const initialState = {
  token: "",
  user: null,
  loginStatus: false,
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
    default:
      return state;
  }
};
