import {ShoppingCartHeader} from "../shoppingcart/ShoppingCartHeader";
import {ShoppingCartFooter} from "../shoppingcart/ShoppingCartFooter";
import './Checkout.css'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {LoginModal} from "./LoginModal";
import {useState} from "react";
import {useSelector} from "react-redux";

export const Checkout = () => {
    const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOpenLoginModal = () => {
        setIsModalOpen(true)
    }
    const handleCLoseLoginModal = () => {
        setIsModalOpen(false)
    }

    return (
        <>

            <ShoppingCartHeader/>
            <h1 style={{marginTop: '100px', padding: "20px 0"}}>Checkout</h1>
            <div className='checkoutBody'>
                <div className='checkoutBodyLeft'>
                    <div className='loginContainer'>
                        <div className='loginTitle'>
                            <AccountCircleOutlinedIcon/>
                            <span>Have an account?</span>
                        </div>
                        <p className='loginText' onClick={handleOpenLoginModal}><span>Log in</span> to checkout more
                            quickly and easily</p>
                    </div>
                </div>

                <div className='checkoutBodyRight'>
                    <div className='shoppingCartContainer'>
                        <p>Need to add more details here, see if we still need our backend or change our backend</p>
                        {shoppingCart.map((item, index) => {
                            return (

                                <div key={index}>
                                    <div>{item.quantity}</div>
                                    <div>{item.productId}</div>
                                    <div>{item.size}</div>
                                </div>


                            )
                        })}
                    </div>
                </div>

            </div>

            <ShoppingCartFooter/>
            {isModalOpen && <LoginModal handleModalClose={handleCLoseLoginModal}/>}
        </>
    )
}