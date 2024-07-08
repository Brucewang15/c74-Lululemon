import './ThankYou.scss'
import {ShoppingCartHeader} from "../shoppingcart/ShoppingCartHeader";
import {ShoppingCartFooter} from "../shoppingcart/ShoppingCartFooter";
import {useNavigate} from "react-router-dom";

export const ThankYou = () => {
    const navigate = useNavigate()
    return (
        <>
            <ShoppingCartHeader/>
            <div className='thankYou' style={{width: '100%', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0'}}>

                <h1 style={{width: '100%', marginTop: '100px', padding: "20px 0"}}>Thank you for shopping with us!</h1>
                <button onClick={()=> navigate('/')}>Continue Shopping</button>
            </div>
            <ShoppingCartFooter/>
        </>
    );
}