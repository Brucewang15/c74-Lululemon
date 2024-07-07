import {ShoppingCartHeader} from "../shoppingcart/ShoppingCartHeader";
import {ShoppingCartFooter} from "../shoppingcart/ShoppingCartFooter";
import './Checkout.css'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {LoginModal} from "./LoginModal";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {myKey} from "../../redux/utils/helper";
import {fetchCartItems} from "../../redux/actions/shoppingCartActions";
import {fetchProductDetails} from "../../redux/utils/api";
import {loginSuccess, setToken, setUser} from "../../redux/actions/authAction";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

export const Checkout = () => {
    const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)
    const userInfo = useSelector(state => state.authReducer.user) || {}
    const token = useSelector(state => state.authReducer.token)
    const dispatch = useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [productDetails, setProductDetails] = useState([]);
    const [isExpanded, setIsExpanded] = useState(true)
    const totalItems = shoppingCart.reduce((total, item) => total + item.quantity, 0);
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


    useEffect(() => {
        const checkTokenValidity = () => {
            const storedToken = localStorage.getItem('token')
            const expirationTime = localStorage.getItem('tokenExpiration')
            const userInfo = JSON.parse(localStorage.getItem('userInfo'))
            if (storedToken && expirationTime) {
                const currentTime = new Date().getTime()
                if (currentTime < expirationTime) {
                    dispatch(setToken(storedToken))
                    dispatch(setUser(userInfo))
                    dispatch(loginSuccess())
                    setIsSuccess(true)
                } else {
                    localStorage.removeItem('token')
                    localStorage.removeItem('tokenExpiration')
                    localStorage.removeItem('userInfo')
                    setIsSuccess(false)
                }
            }
        }
        checkTokenValidity()
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCartItems())
    }, [dispatch]);


    useEffect(() => {
        const fetchDetails = async () => {
            const details = await Promise.all(shoppingCart.map(item => fetchProductDetails(item.productId)));
            setProductDetails(details);
        };
        if (shoppingCart.length > 0) {
            fetchDetails();
        }
    }, [shoppingCart]);


    const getCurrentImage = (item, productDetail) => {
        const currentImage = productDetail?.images?.find(image => image.colorId === item.colorId);
        if (currentImage) {
            return {
                image: currentImage.mainCarousel.media.split('|')[0].trim(),
                colorAlt: currentImage.colorAlt,
            };
        }
        return {
            image: '',
            colorAlt: 'No Color Alt',
        };
    };
    const convertPriceToNumber = (price) => {
        if (!price) {
            return '$0.00';
        }
        try {
            if (!price.startsWith('$')) {
                throw new Error('Price format is incorrect');
            }
            // convert the '$85 CAD' to, a number so we can use to calculate, and then convert it to '$85.00' form.
            const newPrice = price.replace('$', '').trim();
            const priceNumber = Number(newPrice.slice(0, newPrice.indexOf('C')).trim()).toFixed(2);
            // console.log('newPrice:', newPrice, 'priceNumber:', priceNumber, 'typeof PriceNumber:', typeof priceNumber)
            return `$${priceNumber}`;
        } catch (error) {
            console.error('Error converting price:', error);
            return '$0.00';
        }
    }
    const calcTotalPrice = (price, quantity) => {
        if (!price) {
            return 0;
        }
        try {
            if (!price.startsWith('$')) {
                throw new Error('Price format is incorrect');
            }
            const newPrice = price.replace('$', '').trim();
            const priceNumber = Number(newPrice.slice(0, newPrice.indexOf('C')).trim());
            if (isNaN(priceNumber) || isNaN(quantity)) {
                throw new Error('Invalid number format');
            }
            return priceNumber * quantity;
        } catch (error) {
            console.error('Error calculating total price:', error);
            return 0;
        }
    };

    const handleExpand = () => {
        setIsExpanded(!isExpanded)
    }

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
                            <button onClick={handlePlaceOrder}>Place your order here</button>
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
                                ${shoppingCart.reduce((total, item, index) => {
                                const productDetail = productDetails[index];
                                return total + (productDetail ? calcTotalPrice(productDetail.price, item.quantity) : 0);
                            }, 0).toFixed(2)}</div>
                        </div>
                        {isExpanded && <div className='shoppingCartContainer'>
                            {shoppingCart.map((item, index) => {
                                const productDetail = productDetails[index];
                                const {image, colorAlt} = getCurrentImage(item, productDetail);
                                return (
                                    <div key={index} className="shoppingCartItem">
                                        <img className='productImage' src={image} alt={colorAlt}/>
                                        <div className='productInfo'>
                                            <h3>{productDetail?.name}</h3>
                                            <p>Color: {colorAlt}</p>
                                            <p>Size: {item.size}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Price: {convertPriceToNumber(productDetail?.price)}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>}
                        <div className="orderTotal">
                            <div className="orderTotalRow">
                                <span>Subtotal</span>
                                <span>${shoppingCart.reduce((total, item, index) => {
                                    const productDetail = productDetails[index];
                                    return total + (productDetail ? calcTotalPrice(productDetail.price, item.quantity) : 0);
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
                                    {shoppingCart.reduce((total, item, index) => {
                                        const productDetail = productDetails[index];
                                        return total + (productDetail ? calcTotalPrice(productDetail.price, item.quantity) : 0);
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
