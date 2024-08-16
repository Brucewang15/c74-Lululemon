import { ShoppingCartHeader } from "../shoppingcart/ShoppingCartHeader";
import { ShoppingCartFooter } from "../shoppingcart/ShoppingCartFooter";
import "./Checkout.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { LoginModal } from "./LoginModal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { myKey } from "../../redux/utils/helper";
import { fetchCartItems } from "../../redux/actions/shoppingCartActions";
import { useNavigate } from "react-router-dom";
import {
  loginSuccess,
  setToken,
  setUser,
} from "../../redux/actions/authAction";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";


import countriesData from './countriesAndStates.json'
import {loadStripe} from "@stripe/stripe-js";

export const Checkout = () => {
  const isLogin = useSelector((state) => state.authReducer.loginStatus);

  const shoppingCart = useSelector(
    (state) => state.shoppingCartReducer.shoppingCart,
  );
  const userInfo = useSelector((state) => state.authReducer.user) || {};
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);


  const [isGift, setIsGift] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [activeOption, setActiveOption] = useState(null); // if there are multiple things, no need for multiple useStates. just use one.

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);

  const [whichState, setWhichState] =useState(null)
  const handleCountryChange = (e) => {



    setSelectedCountry(e.target.value)
  }
  console.log(selectedCountry, states, whichState, 2)


  useEffect(() => {

    if (selectedCountry !== null) {

      const country = countriesData.countries.find(c => c.name === selectedCountry);
      setStates(country.states)

    }

  }, [selectedCountry]); //why useEffect works?


  const handleWhichState = (e) => {
    setWhichState(e.target.value)
    console.log(whichState)
  }

  const handleActiveOption = (which) => {
    setActiveOption(which)
  }

  const totalItems = shoppingCart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const shoppingCart1 = useSelector(
      (state) => state.shoppingCartReducer.shoppingCart,
  );

  const makePayment = async () => {

    const stripe = await loadStripe('pk_test_51PnMZjIsvOFHvBvCO3hpgLRwd5oJSwBsUz0P11DOs3cQsYGMjiFQsdT1opFFeJZmHbxX2eOuWFqT4SAKkINTNJRi00vpdvOXdh');

    const body = {
      products: shoppingCart1
    }
    const headers = {
      'Content-Type': "application/json"
    }
    const response = await fetch('https://localhost:3399/checkout/stripe', {

      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)

    })

    console.log("testing")
    const session = await response.json()
    const result = stripe.redirectToCheckout({
      sessionId:session.id
    })
    if (result.error) {
      console.log(result.error)
    }
  }

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
      taxRate: 1.13,
      isActive: true,
      isDelete: false,
      orderItems: shoppingCart.map((item) => {
        return {
          quantity: item.quantity,
          productId: item.productId,
          colorId: item.colorId,
          size: item.size,
        };
      }),
    };
    axios
      .post(`http://api-lulu.hibitbyte.com/order?mykey=${myKey}`, requestBody, {
        headers: {
          authorization: `bear ${token}`,
        },
      })
      .then(async (res) => {
        console.log("Order Placed successfully", res.data);
        await axios.delete(`http://localhost:8000/cart/cleanup`);
        console.log("Cart cleaned up successfully");
        navigate("/shop/thankyou");
      })
      .catch((err) => console.error("Order place failed", err));
  };

  useEffect(() => {
    const checkTokenValidity = () => {
      const storedToken = localStorage.getItem("token");
      const expirationTime = localStorage.getItem("tokenExpiration");
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (storedToken && expirationTime) {
        const currentTime = new Date().getTime();
        if (currentTime < expirationTime) {
          dispatch(setToken(storedToken));
          dispatch(setUser(userInfo));
          dispatch(loginSuccess());
          setIsSuccess(true);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
          localStorage.removeItem("userInfo");
          setIsSuccess(false);
        }
      }
    };
    checkTokenValidity();
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCartItems(isLogin));
  }, [dispatch, isLogin]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <ShoppingCartHeader />
      <h1 style={{ marginTop: "80px", paddingTop: "30px" }}>Checkout</h1>
      <div className="checkoutBody">
        {isLogin === false ? (
          <div className="checkoutBodyLeft">
            <div className="loginContainer" id="container">
              <div className="loginTitle">
                <AccountCircleOutlinedIcon />
                <span>Have an account?</span>
              </div>
              <p className="loginText" onClick={handleOpenLoginModal}>
                <span>Log in</span> to checkout more quickly and easily
              </p>
            </div>
            <div className="contactInfo" id="container">
              <div className="title">Contact Information</div>
              <div className="email">Email Address (for order notification)</div>
              <input id="input" type="text"/>
              <div className="checkbox">
                <input type="checkbox"/>
                <div>Sign me up for lululemon emails (you can unsubscribe at any time). See our privacy policy for details.</div>
              </div>
            </div>

            <div className="shippingAddress" id="container">

              <div className="title">Shipping Address</div>
              Location
              <select onChange={handleCountryChange} className="location" id="input">
                {countriesData.countries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                ))}

              </select>
              <div className="two">

                <div className="individual">
                  First name
                  <input type="text" id="input"/>
                </div>

                <div className="individual">
                  Last name
                  <input type="text" id="input"/>
                </div>


              </div>

              <div className="phoneNumber">
                Phone Number
                <input type="text" id="input"/>
              </div>


              <div className="phoneNumber">
                Address
                <input type="text" id="input"/>
              </div>

              <div className="phoneNumber">
                Delivery note (Optional)
                <input type="text" id="input"/>
              </div>

              <div className="three">

                <div className="individual">
                  City
                  <input type="text" id="input"/>
                </div>


                <div className="individual">

                  {(states.length !== 0 && <>

                    State
                    <select onChange={handleWhichState} id = "input"  name="" >
                      {
                        states.map((state) => (
                            <option  key={state.name} value={state.name}>{state}</option>
                        ))
                      }
                    </select>

                  </>)}

                </div>

                <div className="individual">
                  Zip Code
                  <input type="text" id="input"/>
                </div>


              </div>


            </div>

              <div className="shippingGift" id="container">
                <div className="title">Shipping & gift options</div>
                {(!isChange && <div>
                  <div onClick={() => {
                    setIsChange(isChange => !isChange)
                  }} className="change">Change
                  </div>

                </div>)}

                {(isChange && <div className="isChange">

                <div
                        className='options'
                        onClick={() => handleActiveOption(0)}
                    >
                      <div className={`optionCheckbox ${activeOption === 0 ? 'optionCheckboxClicked' : ''}`}></div>
                      <div className="optionsRight">
                        <div className="top">2-7 business days</div>
                        <div className="bottom">Standard shipping (FREE)</div>
                      </div>
                    </div>
                    <div
                        className="options"
                        onClick={() => handleActiveOption(1)}
                    >
                      <div className={`optionCheckbox ${activeOption === 1 ? 'optionCheckboxClicked' : ''}`}></div>
                      <div className="optionsRight">
                        <div className="top">2-4 business days</div>
                        <div className="bottom">Express Shipping ($20.00)</div>
                      </div>
                    </div>
                    <div
                        className="options"
                        onClick={() => handleActiveOption(2)}
                    >
                      <div className={`optionCheckbox ${activeOption === 2 ? 'optionCheckboxClicked' : ''}`}></div>
                      <div className="optionsRight">
                        <div className="top">2-3 business days</div>
                        <div className="bottom">Priority Shipping ($30.00)</div>
                      </div>
                    </div>

                  </div>)}
                {(!isChange && <div>
                  <div className="shippingTime">2-7 Business Days</div>
                  <div className="shippingTimeText">Standard Shipping (FREE)</div>
                </div>)}


                <div className="checkbox">
                  <input
                      checked={isGift}
                      onChange={(event) => setIsGift(event.target.checked)}
                      type="checkbox"/>
                  This is a gift. Add a message
                </div>

                {(isGift && <>

                  <div className="two">
                    <div className="individual">
                      To
                      <input type="text" id="input"/>
                    </div>

                    <div className="individual">
                      From
                      <input type="text" id="input"/>
                    </div>
                  </div>

                  Message
                  <input type="text" id="input"/>
                  Your message will be printed on a receipt with prices hidden.


                </>)}


              </div>

            <div onClick={makePayment} className="nextStep">
              GO TO NEXT STEP
            </div>

          </div>
        ) : (
            <div className="checkoutBodyLeft">
                <div className="loginContainer">
                    <div className="loginTitle">
                <span>
                  Welcome Back {userInfo.firstName} {userInfo.lastName}
                </span>
                </div>
                <button onClick={handlePlaceOrder}>
                <img
                  src="https://i0.wp.com/cypruscomiccon.org/wp-content/uploads/2015/07/Paypal-logo-white.svg1_.png?ssl=1"
                  alt=""
                />
              </button>
            </div>
          </div>
        )}

        <div className="checkoutBodyRight">
          <div className="orderSummary">
            <h2>Order summary</h2>
            <div className="orderHeader">
              <div className="orderHeaderLeft">
                <ShoppingBagOutlinedIcon />
                <span>{`${totalItems} ${totalItems === 1 && totalItems !== 0 ? "item" : "items"}`}</span>
                {isExpanded ? (
                  <ExpandLessOutlinedIcon onClick={handleExpand} />
                ) : (
                  <ExpandMoreOutlinedIcon onClick={handleExpand} />
                )}
              </div>
              <div className="orderHeaderRight">
                $
                {shoppingCart
                  .reduce((total, item) => {
                    return total + item.price * item.quantity;
                  }, 0)
                  .toFixed(2)}
              </div>
            </div>
            {isExpanded && (
              <div className="shoppingCartContainer">
                {shoppingCart.map((item, index) => (
                  <div key={index} className="shoppingCartItem">
                    <img
                      className="productImage"
                      src={item.image}
                      alt={item.swatchName}
                    />
                    <div className="productInfo">
                      <h3>{item.name}</h3>
                      <p>Color: {item.swatchName}</p>
                      <p>Size: {item.size}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${Number(item.price).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="orderTotal">
              <div className="orderTotalRow">
                <span>Subtotal</span>
                <span>
                  $
                  {shoppingCart
                    .reduce((total, item) => {
                      return total + item.price * item.quantity;
                    }, 0)
                    .toFixed(2)}
                </span>
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
                  {shoppingCart
                    .reduce((total, item) => {
                      return total + item.price * item.quantity;
                    }, 0)
                    .toFixed(2)}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShoppingCartFooter />
      {isModalOpen && (
        <LoginModal
          handleModalClose={handleCLoseLoginModal}
          isSuccess={isSuccess}
          setIsSuccess={setIsSuccess}
        />
      )}
    </>
  );
};
