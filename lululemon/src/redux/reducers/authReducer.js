import { actionTypes } from "../actions/actionTypes";

const initialState = {
  token: "",
  user: null,
  loginStatus: false,
  addressList: [],
  userId: null,
  selectedAddress: {},
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
        addressList: action.payload,
      };

    case actionTypes.SELECT_ADDRESS:
      const newAddressList = [...state.addressList];
      const newAddress = newAddressList.find(
        (address) => address.id === action.payload,
      );
      return {
        ...state,
        selectedAddress: newAddress,
      };
    default:
      return state;
  }
};
