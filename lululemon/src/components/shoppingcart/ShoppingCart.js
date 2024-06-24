import {useSelector} from "react-redux";
import {EmptyShoppingCart} from "./EmptyShoppingCart";
import {ShoppingCartWithItems} from "./ShoppingCartWithItems";
import AccessAlarmTwoToneIcon from '@mui/icons-material/AccessAlarmTwoTone';


export const ShoppingCart = () => {
    const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)


    return (

        <div>
            {shoppingCart && shoppingCart.length === 0 && <EmptyShoppingCart/>}
            {shoppingCart && shoppingCart.length > 0 && <ShoppingCartWithItems/>}
        </div>

    )
}