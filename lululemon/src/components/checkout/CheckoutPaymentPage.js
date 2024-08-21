import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paypal } from "./Paypal";
import { ShoppingCartHeader } from "../shoppingcart/ShoppingCartHeader";
import { ShoppingCartFooter } from "../shoppingcart/ShoppingCartFooter";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import "./CheckoutPaymentPage.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import paypalImage from "../../assets/paypal.jpg";
import {
  getOrderAddress,
  getOrderItemsByOrderId,
  setOrderId,
} from "../../redux/actions/shoppingCartActions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CheckoutPaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({
    taxAmount: 0,
    totalBeforeTax: 0,
    totalAfterTax: 0,
    shippingFee: 0,
    orderStatus: "pending",
  });

  // user info related redux
  const userInfo = useSelector((state) => state.authReducer.user) || {};
  const userId =
    useSelector((state) => state.authReducer.userId) ||
    localStorage.getItem("userId");
  const selectedAddress = useSelector(
    (state) => state.authReducer.selectedAddress,
  );



  // order related redux
  const orderId = useSelector((state) => state.shoppingCartReducer.orderId);
  const orderItems = useSelector(
    (state) => state.shoppingCartReducer.orderItems,
  );
  const orderTotalItems = orderItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const orderAddress = useSelector(
    (state) => state.shoppingCartReducer.orderAddress,
  );

  // shopping cart related redux
  const shoppingCart = useSelector(
    (state) => state.shoppingCartReducer.shoppingCart,
  );
  const totalItems = shoppingCart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // costs(tax + shipping fee) related redux
  const shippingCost = useSelector(
    (state) => state.shoppingCartReducer.shippingCost,
  );
  const taxAmount = useSelector((state) => state.shoppingCartReducer.taxAmount);
  const totalBeforeTax = useSelector(
    (state) => state.shoppingCartReducer.totalBeforeTax,
  );
  const totalPrice = isNaN(orderData.taxAmount)
    ? (orderData.totalBeforeTax + orderData.shippingFee).toFixed(2)
    : (
        orderData.totalBeforeTax +
        orderData.shippingFee +
        orderData.taxAmount
      ).toFixed(2);

  const [isExpanded, setIsExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleOpenLoginModal = () => {
    setIsModalOpen(true);
  };

  //get order id from localStoarge and dispatch it to redux -- just in case we refresh the page
  // get order items and address from db
  useEffect(() => {
    const orderId = localStorage.getItem("orderId");
    if (orderId) {
      dispatch(setOrderId(orderId));
      dispatch(getOrderItemsByOrderId(orderId));
      dispatch(getOrderAddress(orderId));

      // get shipping fee, tax, total from the db
      axios
        .get(`http://localhost:3399/order/${orderId}`)
        .then((res) => {
          const {
            shippingFee,
            taxAmount,
            totalBeforeTax,
            totalAfterTax,
            orderStatus,
          } = res.data.data.order;
          setOrderData((prevState) => ({
            ...prevState,
            shippingFee: shippingFee,
            taxAmount: taxAmount,
            totalBeforeTax: totalBeforeTax,
            totalAfterTax: totalAfterTax,
            orderStatus: orderStatus,
          }));
          console.log(res);
        })
        .catch((e) => console.log("fetching order info failed", e));
    }
  }, [dispatch, orderId, orderData.orderStatus]);

  useEffect(() => {
    if (orderData.orderStatus === "paid") {
      setTimeout(() => navigate("/shop/thankyou"), 3000);
    }
  }, [orderData.orderStatus]);
  return (
    <>
      <ShoppingCartHeader />
      <h1 style={{ marginTop: "80px", paddingTop: "30px" }}>Checkout</h1>
      <div className="checkoutBody">
        <div className="checkoutBodyLeft">
          <div className="infoCard">
            <div className="infoRow">
              <div className="infoTitle">
                <div
                  className="icon"
                  style={{ display: "inline", marginRight: "10px" }}
                >
                  <CheckCircleOutlineIcon />
                </div>
                Notifications to
              </div>
              <div className="infoDetails">
                <div className="infoDetailsHeader">Email</div>
                <div className="infoDetailsRow">
                  <p>{userInfo.email}</p>
                </div>
              </div>
              <div onClick = {() => window.location.href='/shop/checkout'} className="infoEdit">Edit</div>
            </div>
            <div className="infoRow">
              <div className="infoTitle">
                <div
                  className="icon"
                  style={{ display: "inline", marginRight: "10px" }}
                >
                  <CheckCircleOutlineIcon />
                </div>
                Sending to
              </div>
              <div className="infoDetails">
                <div className="infoDetailsHeader">Address</div>
                <div className="infoDetailsRow">
                  <p>
                    {orderAddress &&  `${orderAddress.firstName} ${orderAddress.lastName}`}
                  </p>
                  <p>{selectedAddress && selectedAddress.address}</p>
                  <p>
                    {orderAddress &&
                      `${orderAddress.city}, ${orderAddress.province}, ${orderAddress.postalCode}`}
                  </p>
                  <p>{orderAddress && orderAddress.phoneNumber}</p>
                </div>
              </div>
              <div onClick = {() => window.location.href='/shop/checkout'} className="infoEdit">Edit</div>
            </div>
            <div className="infoRow">
              <div className="infoTitle">
                <div
                  className="icon"
                  style={{ display: "inline", marginRight: "10px" }}
                >
                  <CheckCircleOutlineIcon />
                </div>
                Estimated delivery
              </div>
              <div className="infoDetails">
                {shippingCost === 0 && <p>2-7 business days (FREE)</p>}
                {shippingCost === 20 && <p>2-4 business days ($20.00)</p>}
                {shippingCost === 30 && <p>2-3 business days ($30.00)</p>}
              </div>
              <div onClick = {() => window.location.href='/shop/checkout'} className="infoEdit">Edit</div>
            </div>
          </div>
          <div className="infoCard">
            <div className="payment">
              <div className="paymentHeader">Payment method</div>
              <div className="paymentRow">
                <div className="paymentMethod">
                  <img src={paypalImage} alt="Loading" />
                  <h3>Pay with PayPal</h3>
                </div>
                <div className="paypal">
                  {totalPrice > 0 && orderData.orderStatus === "pending" && (
                    <Paypal orderId={orderId} amount={totalPrice} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="checkoutBodyRight">
          <div className="orderSummary">
            <h2>Order summary</h2>
            <div className="orderHeader">
              <div className="orderHeaderLeft">
                <ShoppingBagOutlinedIcon />
                <span>{`${orderTotalItems} ${orderTotalItems === 1 && orderTotalItems !== 0 ? "item" : "items"}`}</span>
                {isExpanded ? (
                  <ExpandLessOutlinedIcon onClick={handleExpand} />
                ) : (
                  <ExpandMoreOutlinedIcon onClick={handleExpand} />
                )}
              </div>
              <div className="orderHeaderRight">
                ${orderData.totalBeforeTax.toFixed(2)}
              </div>
            </div>
            {isExpanded && (
              <div className="shoppingCartContainer">
                {orderItems &&
                  orderItems.length > 0 &&
                  orderItems.map((item, index) => (
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
                  ${/*{orderItems*/}
                  {/*  .reduce((total, item) => {*/}
                  {/*    return total + item.price * item.quantity;*/}
                  {/*  }, 0)*/}
                  {/*  .toFixed(2)}*/}
                  {orderData.totalBeforeTax.toFixed(2)}
                </span>
              </div>
              <div className="orderTotalRow">
                <span>Shipping</span>
                <span>
                  {orderData.shippingFee === 0
                    ? "FREE"
                    : `$${orderData.shippingFee}.00`}
                </span>
              </div>
              <div className="orderTotalRow">
                <span>Tax</span>
                {/*<span>{(initialTaxRate * totalBeforeTax).toFixed(2)}</span>*/}
                <span>{`$${isNaN(orderData.taxAmount) === true ? (0).toFixed(2) : orderData.taxAmount.toFixed(2)}`}</span>
              </div>
              <div className="orderTotalFinal">
                <h3>
                  Order Total: CAD $
                  {isNaN(orderData.taxAmount)
                    ? (
                        orderData.totalBeforeTax + orderData.shippingFee
                      ).toFixed(2)
                    : (
                        orderData.totalBeforeTax +
                        orderData.shippingFee +
                        orderData.taxAmount
                      ).toFixed(2)}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShoppingCartFooter />
    </>
  );
};
