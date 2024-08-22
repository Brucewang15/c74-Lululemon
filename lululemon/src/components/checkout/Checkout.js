/* global google */
import { ShoppingCartHeader } from "../shoppingcart/ShoppingCartHeader";
import { ShoppingCartFooter } from "../shoppingcart/ShoppingCartFooter";
import "./Checkout.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { LoginModal } from "./LoginModal";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { myKey, serverAPI } from "../../redux/utils/helper";
import {
  fetchCartItems,
  setOrderId,
  setShippingCost,
  setTaxAmount,
  setTaxRate,
  setTotalBeforeTaxRedux,
} from "../../redux/actions/shoppingCartActions";
import { useNavigate } from "react-router-dom";
import {
  fetchAddressList,
  loginSuccess,
  selectAnAddress,
  setToken,
  setUser,
} from "../../redux/actions/authAction";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

import countriesData from "./countriesAndStates.json";

import { useJsApiLoader } from "@react-google-maps/api";
import { mapsAPIKey } from "../../redux/utils/helper";
import { Library } from "@googlemaps/js-api-loader";

import taxRateData from "./taxRate.json";
import { ShippingAddressList } from "./ShippingAddressList";

export const Checkout = () => {
  const navigator = useNavigate();

  // shopping cart
  const shoppingCart = useSelector(
    (state) => state.shoppingCartReducer.shoppingCart
  );

  // user infomration related
  const userInfo = useSelector((state) => state.authReducer.user) || {};
  const userId =
    useSelector((state) => state.authReducer.userId) ||
    localStorage.getItem("userId");
  const token = useSelector((state) => state.authReducer.token);
  const isLogin = useSelector((state) => state.authReducer.loginStatus);

  // address related
  const addressList = useSelector((state) => state.authReducer.addressList);
  const selectedAddress = useSelector(
    (state) => state.authReducer.selectedAddress
  );

  // tax and shipping cost related
  const shippingCost = useSelector(
    (state) => state.shoppingCartReducer.shippingCost
  );
  const taxRate = useSelector((state) => state.shoppingCartReducer.taxRate);
  const taxAmount = useSelector((state) => state.shoppingCartReducer.taxAmount);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // address related
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // bottom part ( gift and shipping options related)
  const [giftTo, setGiftTo] = useState("");
  const [giftFrom, setGiftFrom] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [isGift, setIsGift] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [activeOption, setActiveOption] = useState(null); // if there are multiple things, no need for multiple useStates. just use one.

  // address related
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    countriesData.countries[0].name
  );
  const [states, setStates] = useState([]);
  const [whichState, setWhichState] = useState(null);
  const [streetAddress, setStreetAddress] = useState(null);

  // tax related
  const [totalBeforeTax, setTotalBeforeTax] = useState(0);

  // address and google map related
  const [formData, updateFormData] = useState({
    country: "",
    state: "",
    city: "",
    zipcode: "",
    streetAddress: "",
    fullAddress: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
  });

  const libs = ["core", "maps", "places", "marker"];

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapsAPIKey,
    libraries: libs,
  });
  const autoCompleteRef = useRef(null);
  const placeAutoCompleteRef = useRef(null);

  const placeOrder = async (userId, orderData) => {
    try {
      const response = await axios.post(
        `http://localhost:3399/order/${userId}`,
        { orderData }
      );
      const { orderId } = response.data.data;
      console.log(response);
      localStorage.setItem("orderId", orderId);
      dispatch(setOrderId(orderId));
    } catch (err) {
      console.log("Place order failed.", err);
    }
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  // console.log(selectedCountry, states, whichState, 2);

  // get total price before tax when the page loads
  useEffect(() => {
    let total = 0;
    if (shoppingCart.length !== 0) {
      total = shoppingCart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      setTotalBeforeTax(total);
      dispatch(setTotalBeforeTaxRedux(total));
    } else {
      setTotalBeforeTax(0);
      dispatch(setTotalBeforeTaxRedux(0));
    }
    console.log("total price before tax:", total);
  }, [shoppingCart, dispatch]);

  // get tax amount based on country and province/state, for both new address and saved address
  useEffect(() => {
    const calculateTotalAndTax = () => {
      if (totalBeforeTax !== 0) {
        let taxRate = 0;

        if (isNewAddress) {
          if (selectedCountry) {
            if (
              selectedCountry === "Canada" ||
              selectedCountry === "United States"
            ) {
              if (formData.state) {
                taxRate =
                  taxRateData.taxRates[selectedCountry][formData.state] ||
                  taxRateData.defaultTaxRate;
                console.log(
                  `Tax rate for ${selectedCountry}, ${formData.state}:`,
                  taxRate
                );
              }
            } else {
              taxRate = taxRateData.defaultTaxRate;
              console.log("Tax rate for other countries (default):", taxRate);
            }
          }
        } else if (selectedAddress) {
          if (selectedAddress.country) {
            if (
              selectedAddress.country === "Canada" ||
              selectedAddress.country === "United States"
            ) {
              if (selectedAddress.province) {
                taxRate =
                  taxRateData.taxRates[selectedAddress.country][
                    selectedAddress.province
                  ] || taxRateData.defaultTaxRate;
                console.log(
                  `Tax rate for ${selectedAddress.country}, ${selectedAddress.province}:`,
                  taxRate
                );
              }
            } else {
              taxRate = taxRateData.defaultTaxRate;
              console.log("Tax rate for other countries (default):", taxRate);
            }
          }
        }

        const taxAmount = taxRate * totalBeforeTax;
        dispatch(setTaxRate(taxRate));
        dispatch(setTaxAmount(taxAmount));
        console.log("Calculated Tax Amount:", taxAmount);
      } else {
        dispatch(setTaxRate(0));
        dispatch(setTaxAmount(0));
      }
    };

    calculateTotalAndTax();
  }, [
    isNewAddress,
    formData.country,
    formData.state,
    selectedAddress,
    shoppingCart,
    totalBeforeTax,
    dispatch,
    selectedCountry,
  ]);

  // useEffects -----
  //get user's shipping Address list
  useEffect(() => {
    // console.log("userId==>", userId);
    isLogin && userId && dispatch(fetchAddressList(userId));
  }, [dispatch, isLogin, userId]);

  useEffect(() => {
    if (selectedCountry !== null) {
      const country = countriesData.countries.find(
        (c) => c.name === selectedCountry
      );
      setStates(country.states);
    }
  }, [selectedCountry]); //why useEffect works?

  // initialize the shippingCost to be 0 by default
  useEffect(() => {
    dispatch(setShippingCost(0));
  }, [dispatch]);

  useEffect(() => {
    if (isLoaded && placeAutoCompleteRef) {
      // const location = new google.maps.LatLng(
      //     43.65245414078278,
      //     -79.3802615602835,
      // );
      // const radius = 50000;
      autoCompleteRef.current = new google.maps.places.Autocomplete(
        placeAutoCompleteRef.current,
        {
          // componentRestrictions: { country: "CA" },
          fields: [
            "place_id",
            "geometry",
            "name",
            "formatted_address",
            "address_components",
          ],
          // bounds: new google.maps.Circle({
          //   center: location,
          //   radius: radius,
          // }).getBounds(),
          // strictBounds: false,
        }
      );
      autoCompleteRef.current.addListener("place_changed", onPlaceChanged);
    }
  }, [isLoaded, selectedCountry]);

  const onPlaceChanged = () => {
    const place = autoCompleteRef.current.getPlace();

    if (place && place.address_components) {
      const addressComponents = place.address_components;

      const getComponentName = (type) => {
        const component = addressComponents.find((component) =>
          component.types.includes(type)
        );
        return component ? component.long_name : "";
      };

      if (addressComponents) {
        const streetNumber = getComponentName("street_number");
        const streetName = getComponentName("route");
        const city = getComponentName("locality");
        const state = getComponentName("administrative_area_level_1");
        const zipcode = getComponentName("postal_code");

        const streetAddress = `${streetNumber} ${streetName}`.trim();

        updateFormData((prevState) => ({
          ...prevState,
          streetAddress,
          city,
          state,
          zipcode,
        }));
      }
    }
  };

  const changeHandler = ({ target }) => {
    const { name, value } = target;
    updateFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    let newAddress;
    // if the user click on the new shipping address
    if (isNewAddress) {
      const sanitizedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phone,
        address: formData.streetAddress,
        city: formData.city,
        province: formData.state,
        postalCode: formData.zipcode,
        country: selectedCountry,
      };
      try {
        const res = await axios.post(
          `${serverAPI}/user/userInfo/${userInfo.id}/address`,
          sanitizedData
          // {
          //   firstName: formData.firstName,
          //   lastName: formData.lastName,
          //   phoneNumber: formData.phone,
          //   address: formData.streetAddress,
          //   city: formData.city,
          //   province: formData.state,
          //   postalCode: formData.zipcode,
          // },
        );
        console.log(
          "this is the new address just added to the db==>",
          res.data.data.newAddress
        );

        newAddress = res.data.data.newAddress;
        dispatch(fetchAddressList(userId));
        dispatch(selectAnAddress(newAddress.id));
        console.log("Address added successfully.");
      } catch (e) {
        console.log("Adding address failed.");
      }
    }
    console.log(selectedAddress);
    if (
      (!selectedAddress || Object.keys(selectedAddress).length === 0) &&
      !isNewAddress
    ) {
      alert("You must choose an address or enter a new one");
      return;
    }
    // this is the data needed for placing an order, also should include userId in the params
    const orderData = {
      taxAmount,
      totalBeforeTax,
      shippingAddressId: selectedAddress?.id || newAddress?.id,
      shippingFee: shippingCost,
      isGift: isGift,
      giftTo: giftTo,
      giftFrom: giftFrom,
      giftMessage: giftMessage,
    };
    if (shoppingCart.length !== 0) {
      await placeOrder(userId, orderData);
      dispatch(fetchCartItems(isLogin));
      navigator("/shop/checkout/payment");
    } else {
      alert("Your shopping cart is empty, cannot place order");
    }
  };

  const handleWhichState = (e) => {
    console.log(e.target.value);
    setWhichState(e.target.value);
    console.log("STATE ===> ", whichState);
  };

  const handleActiveOption = (which) => {
    setActiveOption(which);
  };

  const totalItems = shoppingCart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleOpenLoginModal = () => {
    setIsModalOpen(true);
  };
  const handleCLoseLoginModal = () => {
    setIsModalOpen(false);
  };

  const handleShippingCost = (e) => {
    const cost = parseFloat(e.currentTarget.getAttribute("data-value"));
    console.log("this is the shipping cost", cost);
    dispatch(setShippingCost(cost));
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
          </div>
        ) : (
          <div className="checkoutBodyLeft">
            <div className="loginContainer">
              <div className="loginTitle">
                <span>
                  Welcome Back {userInfo.firstName} {userInfo.lastName}
                </span>
              </div>
            </div>

            <form onSubmit={submitHandler} action="">
              <div className="contactInfo" id="container">
                <div className="title">Contact Information</div>
                <div className="email" onChange={changeHandler}>
                  Email Address (for order notification)
                </div>
                <input name="email" id="input" type="text" />
                <div className="checkbox">
                  <input type="checkbox" />
                  <div>
                    Sign me up for lululemon emails (you can unsubscribe at any
                    time). See our privacy policy for details.
                  </div>
                </div>
              </div>

              <div className="shippingAddress" id="container">
                <div className="title">Shipping Address</div>
                <div onClick={() => setIsNewAddress(false)}>
                  <ShippingAddressList
                    addressList={addressList}
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                </div>
                <label
                  className="newAddress"
                  onClick={() => setIsNewAddress(true)}
                >
                  <input
                    type="radio"
                    className="radioInput"
                    name="shippingAddress"
                  />
                  <div className="addressRadio">New shipping address</div>
                </label>
                {isNewAddress && (
                  <>
                    <span>Location</span>
                    <select
                      name="country"
                      onChange={handleCountryChange}
                      className="location"
                      id="input"
                    >
                      {countriesData.countries.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    <div className="two">
                      <div className="individual">
                        First name
                        <input
                          name="firstName"
                          type="text"
                          id="input"
                          onChange={changeHandler}
                        />
                      </div>

                      <div className="individual" onChange={changeHandler}>
                        Last name
                        <input name="lastName" type="text" id="input" />
                      </div>
                    </div>
                    <div className="phoneNumber" onChange={changeHandler}>
                      Phone Number
                      <input name="phone" type="text" id="input" />
                    </div>
                    <div className="phoneNumber">
                      Address
                      <input
                        type="text"
                        id={"streetAddress"}
                        name={"streetAddress"}
                        ref={placeAutoCompleteRef}
                        value={formData.streetAddress}
                        onChange={changeHandler}
                        placeholder="Include apt, suite, or floor number here"
                      />
                    </div>
                    <div className="phoneNumber">
                      Delivery note (Optional)
                      <input type="text" id="input" />
                    </div>
                    <div className="three">
                      <div className="individual">
                        City
                        <input
                          name="city"
                          type="text"
                          id="input"
                          value={formData.city}
                          onChange={changeHandler}
                        />
                      </div>

                      <div className="individual">
                        {/*{states.length !== 0 && (*/}
                        <>
                          {selectedCountry === "Canada"
                            ? "Provinces"
                            : "States"}
                          <input
                            id="input"
                            name="state"
                            value={formData.state}
                            onChange={changeHandler}
                          >
                            {/*{states.map((state) => (*/}
                            {/*  <option key={state.name} value={state.name}>*/}
                            {/*    {state}*/}
                            {/*  </option>*/}
                            {/*))}*/}
                          </input>
                        </>
                        {/*)}*/}
                      </div>

                      <div className="individual">
                        {selectedCountry === "Canada"
                          ? "Postal Code"
                          : "Zip Code"}
                        <input
                          name="zipcode"
                          type="text"
                          id="input"
                          value={formData.zipcode}
                          onChange={changeHandler}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="shippingGift" id="container">
                <div className="title">Shipping & gift options</div>
                {!isChange && (
                  <div>
                    <div
                      onClick={() => {
                        setIsChange((isChange) => !isChange);
                      }}
                      className="change"
                    >
                      Change
                    </div>
                  </div>
                )}

                {isChange && (
                  <div className="isChange">
                    <div
                      data-value="0"
                      className="options"
                      onClick={(e) => {
                        handleActiveOption(0);
                        handleShippingCost(e);
                      }}
                    >
                      <div
                        className={`optionCheckbox ${
                          activeOption === 0 ? "optionCheckboxClicked" : ""
                        }`}
                      ></div>
                      <div className="optionsRight">
                        <div className="top">2-7 business days</div>
                        <div className="bottom">Standard shipping (FREE)</div>
                      </div>
                    </div>
                    <div
                      data-value="20"
                      className="options"
                      onClick={(e) => {
                        handleActiveOption(1);
                        handleShippingCost(e);
                      }}
                    >
                      <div
                        className={`optionCheckbox ${
                          activeOption === 1 ? "optionCheckboxClicked" : ""
                        }`}
                      ></div>
                      <div className="optionsRight">
                        <div className="top">2-4 business days</div>
                        <div className="bottom">Express Shipping ($20.00)</div>
                      </div>
                    </div>
                    <div
                      data-value="30"
                      className="options"
                      onClick={(e) => {
                        handleActiveOption(2);
                        handleShippingCost(e);
                      }}
                    >
                      <div
                        className={`optionCheckbox ${
                          activeOption === 2 ? "optionCheckboxClicked" : ""
                        }`}
                      ></div>
                      <div className="optionsRight">
                        <div className="top">2-3 business days</div>
                        <div className="bottom">Priority Shipping ($30.00)</div>
                      </div>
                    </div>
                  </div>
                )}
                {!isChange && (
                  <div>
                    <div className="shippingTime">2-7 Business Days</div>
                    <div className="shippingTimeText">
                      Standard Shipping (FREE)
                    </div>
                  </div>
                )}

                <div className="checkbox">
                  <input
                    checked={isGift}
                    onChange={(event) => {
                      setIsGift(event.target.checked);
                    }}
                    type="checkbox"
                  />
                  This is a gift. Add a message
                </div>

                {isGift && (
                  <>
                    <div className="two">
                      <div className="individual">
                        To
                        <input
                          type="text"
                          id="input"
                          onChange={(e) => {
                            setGiftTo(e.target.value);
                          }}
                        />
                      </div>

                      <div className="individual">
                        From
                        <input
                          type="text"
                          id="input"
                          onChange={(e) => {
                            setGiftFrom(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    Message
                    <input
                      type="text"
                      id="input"
                      onChange={(e) => {
                        setGiftMessage(e.target.value);
                      }}
                    />
                    Your message will be printed on a receipt with prices
                    hidden.
                  </>
                )}
              </div>

              <button type="submit" className="nextStep">
                GO TO NEXT STEP
              </button>

              {/*<a href="checkout/payment" className="nextStep">*/}
              {/*    GO TO NEXT STEP*/}
              {/*</a>*/}
            </form>
          </div>
        )}

        <div className="checkoutBodyRight">
          <div className="orderSummary">
            <h2>Order summary</h2>
            <div className="orderHeader">
              <div className="orderHeaderLeft">
                <ShoppingBagOutlinedIcon />
                <span>{`${totalItems} ${
                  totalItems === 1 && totalItems !== 0 ? "item" : "items"
                }`}</span>
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
                <span>
                  {shippingCost === 0 ? "FREE" : `$${shippingCost}.00`}
                </span>
              </div>
              <div className="orderTotalRow">
                <span>Tax</span>
                {/*<span>{(initialTaxRate * totalBeforeTax).toFixed(2)}</span>*/}
                <span>{`$${
                  isNaN(taxAmount) === true
                    ? (0).toFixed(2)
                    : taxAmount.toFixed(2)
                }`}</span>
              </div>
              <div className="orderTotalFinal">
                <h3>
                  Order Total: CAD $
                  {isNaN(taxAmount)
                    ? (totalBeforeTax + shippingCost).toFixed(2)
                    : (totalBeforeTax + shippingCost + taxAmount).toFixed(2)}
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

// const handlePlaceOrder = () => {
//   const requestBody = {
//     taxRate: 1.13,
//     isActive: true,
//     isDelete: false,
//     orderItems: shoppingCart.map((item) => {
//       return {
//         quantity: item.quantity,
//         productId: item.productId,
//         colorId: item.colorId,
//         size: item.size,
//       };
//     }),
//   };
//   axios
//     .post(`http://api-lulu.hibitbyte.com/order?mykey=${myKey}`, requestBody, {
//       headers: {
//         authorization: `bear ${token}`,
//       },
//     })
//     .then(async (res) => {
//       console.log("Order Placed successfully", res.data);
//       await axios.delete(`http://localhost:8000/cart/cleanup`);
//       console.log("Cart cleaned up successfully");
//       navigate("/shop/thankyou");
//     })
//     .catch((err) => console.error("Order place failed", err));
// };

// get total amount before tax, and tax rate and calculate tax amount and save in useState & Redux ----
// useEffect(() => {
//   const calculateTotalAndTaxForNewAddress = () => {
//     const total = shoppingCart.reduce((total, item) => {
//       return total + item.price * item.quantity;
//     }, 0);
//     setTotalBeforeTax(total);
//     dispatch(setTotalBeforeTaxRedux(total));
//
//     if (totalBeforeTax !== 0) {
//       let taxRate = 0;
//       if (
//         selectedCountry === "Canada" ||
//         selectedCountry === "United States"
//       ) {
//         if (formData.state) {
//           taxRate = taxRateData.taxRates[selectedCountry][formData.state];
//           console.log(
//             `Tax rate for ${selectedCountry}, ${formData.state}:`,
//             taxRate,
//           );
//         }
//       } else if (selectedCountry && selectedCountry !== "") {
//         taxRate = taxRateData.defaultTaxRate;
//         console.log("Tax rate for other countries (default):", taxRate);
//       } else {
//         console.log("No country selected, tax rate is 0");
//       }
//       // setInitialTaxRate(taxRate);
//       dispatch(setTaxRate(taxRate));
//       const taxAmount = taxRate * totalBeforeTax;
//       console.log("Calculated Tax Amount:", taxAmount);
//       dispatch(setTaxAmount(taxAmount));
//     }
//
//     if (totalBeforeTax === 0) {
//       dispatch(setTaxRate(0));
//       dispatch(setTaxAmount(0));
//     }
//   };
//
//   calculateTotalAndTaxForNewAddress();
// }, [
//   selectedCountry,
//   formData.state,
//   shoppingCart,
//   totalBeforeTax,
//   selectedAddress,
// ]);
