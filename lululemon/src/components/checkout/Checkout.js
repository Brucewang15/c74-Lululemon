import {ShoppingCartHeader} from "../shoppingcart/ShoppingCartHeader";
import {ShoppingCartFooter} from "../shoppingcart/ShoppingCartFooter";
import './Checkout.css'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {LoginModal} from "./LoginModal";
import {useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import {myKey} from "../../redux/utils/helper";

export const Checkout = () => {
    const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)
    const userInfo = useSelector(state => state.authReducer.user)
    const token = useSelector(state => state.authReducer.token)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    // markxu@itlab.com
    // ITLabAPI@2024
    const handleOpenLoginModal = () => {
        setIsModalOpen(true)
    }
    const handleCLoseLoginModal = () => {
        setIsModalOpen(false)
    }

    const handlePlaceOrder = () => {
        const requestBody = {
            "taxRate": 1.13,
            "isActive": true,
            "isDelete": false,
            "orderItems": shoppingCart.map(item => {
                return {
                    quantity: item.quantity,
                    productId: item.productId,
                    colorId: item.colorId,
                    size: item.size,
                }
            })
        }
        axios.post(`http://api-lulu.hibitbyte.com/order?mykey=${myKey}`, requestBody, {
            headers: {
                authorization: `bear ${token}`
            }
        })
            .then(res => console.log('Order Placed successfully', res.data))
            .catch(err => console.error('Order place failed', err))
    }
    return (
        <>

            <ShoppingCartHeader/>
            <h1 style={{marginTop: '100px', padding: "20px 0"}}>Checkout</h1>
            <div className='checkoutBody'>
                {isSuccess === false ? (<div className='checkoutBodyLeft'>
                        <div className='loginContainer'>
                            <div className='loginTitle'>
                                <AccountCircleOutlinedIcon/>
                                <span>Have an account?</span>
                            </div>
                            <p className='loginText' onClick={handleOpenLoginModal}><span>Log in</span> to checkout more
                                quickly and easily</p>
                        </div>
                    </div>) :
                    (<div className='checkoutBodyLeft'>
                        <div className='loginContainer'>
                            <div className='loginTitle'>
                                <span>Welcome Back {userInfo.firstName} {userInfo.lastName}</span>
                            </div>
                            <button onClick={handlePlaceOrder}>Place your order here</button>
                        </div>
                    </div>)
                }

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
            {isModalOpen && <LoginModal handleModalClose={handleCLoseLoginModal} isSuccess={isSuccess}
                                        setIsSuccess={setIsSuccess}/>}
        </>
    )
}