import {ShoppingCartHeader} from "../shoppingcart/ShoppingCartHeader";
import {ShoppingCartFooter} from "../shoppingcart/ShoppingCartFooter";
import './Checkout.css'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {LoginModal} from "./LoginModal";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {myKey} from "../../redux/utils/helper";
import {fetchCartItems} from "../../redux/actions/shoppingCartActions";
import {fetchProductDetails} from "../../redux/utils/api";
import {setToken, setUser} from "../../redux/actions/authAction";
import {useNavigate} from "react-router-dom";

export const Checkout = () => {
    const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)
    const userInfo = useSelector(state => state.authReducer.user) || {}
    const token = useSelector(state => state.authReducer.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [productDetails, setProductDetails] = useState([]);
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
        navigate('/shop/thankyou')
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
    return (
        <>

            <ShoppingCartHeader/>
            <h1 style={{marginTop: '100px', padding: "20px 0"}}>Checkout</h1>
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
                                        <p>Price: {productDetail?.price}</p>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="orderTotal">
                            <h3>
                                Total: $
                                {shoppingCart.reduce((total, item, index) => {
                                    const productDetail = productDetails[index];
                                    return total + (productDetail ? calcTotalPrice(productDetail.price, item.quantity) : 0);
                                }, 0).toFixed(2)}
                            </h3>
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