import {ShoppingCartHeader} from "../shoppingcart/ShoppingCartHeader";
import {ShoppingCartFooter} from "../shoppingcart/ShoppingCartFooter";
import './Checkout.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {LoginModal} from "./LoginModal";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {myKey} from "../../redux/utils/helper";
import {fetchCartItems} from "../../redux/actions/shoppingCartActions";
import {useNavigate} from "react-router-dom";
import {loginSuccess, setToken, setUser} from "../../redux/actions/authAction";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

export const Checkout = () => {
    const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart);
    const userInfo = useSelector(state => state.authReducer.user) || {};
    const token = useSelector(state => state.authReducer.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const totalItems = shoppingCart.reduce((total, item) => total + item.quantity, 0);
    // markxu@itlab.com
    // ITLabAPI@2024
    const handleOpenLoginModal = () => {
        setIsModalOpen(true);
    };
    const handleCLoseLoginModal = () => {
        setIsModalOpen(false);
    };

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
                };
            })
        };
        axios.post(`http://api-lulu.hibitbyte.com/order?mykey=${myKey}`, requestBody, {
            headers: {
                authorization: `bear ${token}`
            }
        })
            .then(async (res) => {
                console.log('Order Placed successfully', res.data);
                await axios.delete(`http://localhost:8000/cart/cleanup`);
                console.log('Cart cleaned up successfully');
                navigate('/shop/thankyou');
            })
            .catch(err => console.error('Order place failed', err));
    };

    useEffect(() => {
        const checkTokenValidity = () => {
            const storedToken = localStorage.getItem('token');
            const expirationTime = localStorage.getItem('tokenExpiration');
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (storedToken && expirationTime) {
                const currentTime = new Date().getTime();
                if (currentTime < expirationTime) {
                    dispatch(setToken(storedToken));
                    dispatch(setUser(userInfo));
                    dispatch(loginSuccess());
                    setIsSuccess(true);
                } else {
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExpiration');
                    localStorage.removeItem('userInfo');
                    setIsSuccess(false);
                }
            }
        };
        checkTokenValidity();
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <ShoppingCartHeader/>
            <h1 style={{marginTop: '80px', paddingTop: '30px'}}>Checkout</h1>
            <div className='checkoutBody'>
                {isSuccess === false ?
                    (<div className='checkoutBodyLeft'>
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
                            <button onClick={handlePlaceOrder}>
                                <img
                                    src="https://i0.wp.com/cypruscomiccon.org/wp-content/uploads/2015/07/Paypal-logo-white.svg1_.png?ssl=1"
                                    alt=""/>
                            </button>
                        </div>
                    </div>)
                }

                <div className='checkoutBodyRight'>
                    <div className='orderSummary'>
                        <h2>Order summary</h2>
                        <div className='orderHeader'>
                            <div className='orderHeaderLeft'>
                                <ShoppingBagOutlinedIcon/>
                                <span>{`${totalItems} ${totalItems === 1 && totalItems !== 0 ? 'item' : 'items'}`}</span>
                                {isExpanded ? <ExpandLessOutlinedIcon onClick={handleExpand}/> :
                                    <ExpandMoreOutlinedIcon onClick={handleExpand}/>}
                            </div>
                            <div className='orderHeaderRight'>
                                ${shoppingCart.reduce((total, item) => {
                                return total + (item.price * item.quantity);
                            }, 0).toFixed(2)}
                            </div>
                        </div>
                        {isExpanded && <div className='shoppingCartContainer'>
                            {shoppingCart.map((item, index) => (
                                <div key={index} className="shoppingCartItem">
                                    <img className='productImage' src={item.image} alt={item.colorAlt}/>
                                    <div className='productInfo'>
                                        <h3>{item.name}</h3>
                                        <p>Color: {item.name}</p>
                                        <p>Size: {item.size}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>}
                        <div className="orderTotal">
                            <div className="orderTotalRow">
                                <span>Subtotal</span>
                                <span>${shoppingCart.reduce((total, item) => {
                                    return total + (item.price * item.quantity);
                                }, 0).toFixed(2)}</span>
                            </div>
                            <div className="orderTotalRow">
                                <span>Shipping</span>
                                <span>FREE</span>
                            </div>
                            <div className="orderTotalRow">
                                <span>Tax</span>
                                <span>Calculated at next step</span>
                            </div>
                            <div className="orderTotalFinal">
                                <h3>
                                    Order Total: CAD $
                                    {shoppingCart.reduce((total, item) => {
                                        return total + (item.price * item.quantity);
                                    }, 0).toFixed(2)}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ShoppingCartFooter/>
            {isModalOpen && <LoginModal handleModalClose={handleCLoseLoginModal} isSuccess={isSuccess}
                                        setIsSuccess={setIsSuccess}/>}
        </>
    );
};
