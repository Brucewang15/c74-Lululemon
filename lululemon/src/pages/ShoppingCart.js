import { useDispatch, useSelector } from "react-redux";
import { EmptyShoppingCart } from "../components/shoppingcart/EmptyShoppingCart";
import { ShoppingCartWithItems } from "../components/shoppingcart/ShoppingCartWithItems";
import AccessAlarmTwoToneIcon from "@mui/icons-material/AccessAlarmTwoTone";

import { useEffect } from "react";
import {
  fetchAllSavedItemsFromServer,
  fetchCartItems,
} from "../redux/actions/shoppingCartActions";

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

  const shoppingCart = useSelector(
    (state) => state.shoppingCartReducer.shoppingCart,
  );
  const isLoggedIn = useSelector((state) => state.authReducer.loginStatus);
  const savedItems = useSelector(
    (state) => state.shoppingCartReducer.savedItems,
  );
  // console.log("shopping cart items: ", shoppingCart);
  const error = useSelector((state) => state.shoppingCartReducer.error);
  const cartId = localStorage.getItem("cartId");
  // Using fake data to test LocalStoarge
  useEffect(() => {
    // saveFakeDataToLocalStorage()
    dispatch(fetchCartItems(isLoggedIn));
  }, [dispatch, isLoggedIn]);
  useEffect(() => {
    console.log(
      "cartId from db, ==>",
      cartId,
      " (if null means not logged in)",
    );
    if (cartId) dispatch(fetchAllSavedItemsFromServer());
  }, [cartId, dispatch]);
  if (error) {
    return <div>Error loading shopping cart: {error.message}</div>;
  }
  // && savedItems.length === 0
  return (
    <div>
      {shoppingCart.length === 0 && savedItems.length === 0 ? (
        <EmptyShoppingCart />
      ) : (
        <ShoppingCartWithItems />
      )}
    </div>
  );
};
