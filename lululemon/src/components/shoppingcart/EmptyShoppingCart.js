import {useNavigate} from "react-router-dom";
import './EmptyShoppingCart.scss'

export const EmptyShoppingCart = () => {
    const navigate = useNavigate()

    return (
        <header className='shoppingCartWrapper'>
            <div className='shoppingCartHeader'>
                <nav className='shoppingCartNav'>
                    <img src="" alt="logo"/>
                    <div>Sign in</div>
                </nav>
            </div>

            <div className='shoppingCartBody'>
                <p>Gir your bag some love!</p>
                <button onClick={() => navigate('/')}>SHOP WHAT"S NEW (need to add navigate)</button>
            </div>

            <div className='shoppingCartFooter'>
                <h3>this is footer</h3>
            </div>
        </header>
    )
}