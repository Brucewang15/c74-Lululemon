import {useDispatch, useSelector} from "react-redux";
import {EmptyShoppingCart} from "./EmptyShoppingCart";
import {ShoppingCartWithItems} from "./ShoppingCartWithItems";
import AccessAlarmTwoToneIcon from '@mui/icons-material/AccessAlarmTwoTone';
import fakeCartData from '../../components/shoppingcart/fakeCartData.json'
import {useEffect} from "react";
import {fetchCartItems} from "../../redux/actions/shoppingCartActions";

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
    const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart);
    console.log("shopping cart items: ", shoppingCart);
    const error = useSelector(state => state.shoppingCartReducer.error);

    // Using fake data to test LocalStoarge
    useEffect(() => {
        // saveFakeDataToLocalStorage()
        dispatch(fetchCartItems())
    }, [dispatch]);

    if (error) {
        return <div>Error loading shopping cart: {error.message}</div>;
    }

    return (
        <div>
            {shoppingCart.length === 0 ? <EmptyShoppingCart /> : <ShoppingCartWithItems />}
        </div>
    );
}