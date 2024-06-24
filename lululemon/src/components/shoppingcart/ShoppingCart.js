import {useSelector} from "react-redux";
import {EmptyShoppingCart} from "./EmptyShoppingCart";
import {ShoppingCartWithItems} from "./ShoppingCartWithItems";
import AccessAlarmTwoToneIcon from '@mui/icons-material/AccessAlarmTwoTone';
import fakeCartData from '../../components/shoppingcart/fakeCartData.json'
import {useEffect} from "react";

const saveFakeDataToLocalStorage = () => {
    const existingCart = localStorage.getItem('shoppingCart');
    if (!existingCart) {
        localStorage.setItem('shoppingCart', JSON.stringify(fakeCartData.cartItems));
    }

};
export const ShoppingCart = () => {
    const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)

    // Using fake data to test LocalStoarge
    useEffect(() => {
        saveFakeDataToLocalStorage()
    }, []);

    return (

        <div>
            {shoppingCart && shoppingCart.length === 0 && <EmptyShoppingCart/>}
            {shoppingCart && shoppingCart.length > 0 && <ShoppingCartWithItems/>}
        </div>

    )
}