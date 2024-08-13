import { useDispatch, useSelector } from "react-redux";
import { EmptyShoppingCart } from "../components/shoppingcart/EmptyShoppingCart";
import { ShoppingCartWithItems } from "../components/shoppingcart/ShoppingCartWithItems";
import AccessAlarmTwoToneIcon from "@mui/icons-material/AccessAlarmTwoTone";

import { useEffect } from "react";
import { fetchCartItems } from "../redux/actions/shoppingCartActions";

// const saveFakeDataToLocalStorage = () => {
//     // const existingCart = localStorage.getItem('shoppingCart');
//     // if (!existingCart) {
//     //     localStorage.setItem('shoppingCart', JSON.stringify(fakeCartData.cartItems));
//     // }
//     localStorage.setItem('shoppingCart', JSON.stringify(fakeCartData.cartItems));
//
// };
export const ShoppingCart = () => {
  const dispatch = useDispatch();
  const savedShoppingCart = useSelector(
    (state) => state.shoppingCartReducer.savedShoppingCart,
  );
  const shoppingCart = useSelector(
    (state) => state.shoppingCartReducer.shoppingCart,
  );
  const isLoggedIn = useSelector((state) => state.authReducer.loginStatus);
  // console.log("shopping cart items: ", shoppingCart);
  const error = useSelector((state) => state.shoppingCartReducer.error);

  // Using fake data to test LocalStoarge
  useEffect(() => {
    // saveFakeDataToLocalStorage()
    dispatch(fetchCartItems(isLoggedIn));
  }, [dispatch, isLoggedIn]);

  if (error) {
    return <div>Error loading shopping cart: {error.message}</div>;
  }

  return (
    <div>
      {shoppingCart.length === 0 && savedShoppingCart.length === 0 ? (
        <EmptyShoppingCart />
      ) : (
        <ShoppingCartWithItems />
      )}
    </div>
  );
};
