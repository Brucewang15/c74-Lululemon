import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Paypal} from "./Paypal";
import {ShoppingCartHeader} from "../shoppingcart/ShoppingCartHeader";
import {ShoppingCartFooter} from "../shoppingcart/ShoppingCartFooter";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import './CheckoutPaymentPage.css'
import {ShippingAddressList} from "./ShippingAddressList";
import countriesData from "./countriesAndStates.json";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import paypalImage from "../../assets/paypal.jpg"

export const CheckoutPaymentPage = () => {
  const userInfo = useSelector((state) => state.authReducer.user) || {};
  const userId =
    useSelector((state) => state.authReducer.userId) ||
    localStorage.getItem("userId");

  const addressSelected = useSelector(state => state.authReducer.selectedAddress)

  const orderId = useSelector(state => state.shoppingCartReducer.orderId)

  const shoppingCart = useSelector(
    (state) => state.shoppingCartReducer.shoppingCart,
  );
  const totalItems = shoppingCart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const shippingCost = useSelector(
    (state) => state.shoppingCartReducer.shippingCost
  );
  const taxAmount = useSelector((state) => state.shoppingCartReducer.taxAmount);
  const totalBeforeTax = useSelector(state => state.shoppingCartReducer.totalBeforeTax)
  const totalPrice = isNaN(taxAmount)
    ? (totalBeforeTax + shippingCost).toFixed(2)
    : (totalBeforeTax + shippingCost + taxAmount).toFixed(2)

  const [isExpanded, setIsExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleOpenLoginModal = () => {
    setIsModalOpen(true);
  };
  return <>
    <ShoppingCartHeader/>
    <h1 style={{marginTop: "80px", paddingTop: "30px"}}>Checkout</h1>
    <div className="checkoutBody">
      <div className="checkoutBodyLeft">
        <div className="infoCard">
          <div className="infoRow">
            <div className="infoTitle">
              <div className="icon" style={{display: "inline", marginRight: "10px"}}>
                <CheckCircleOutlineIcon/>
              </div>
              Notifications to
            </div>
            <div className="infoDetails">
              <div className="infoDetailsHeader">
                Email
              </div>
              <div className="infoDetailsRow">
                <p>{userInfo.email}</p>
              </div>
            </div>
            <div className="infoEdit">Edit</div>
          </div>
          <div className="infoRow">
            <div className="infoTitle">
              <div className="icon" style={{display: "inline", marginRight: "10px"}}>
                <CheckCircleOutlineIcon/>
              </div>
              Sending to
            </div>
            <div className="infoDetails">
              <div className="infoDetailsHeader">
                Address
              </div>
              <div className="infoDetailsRow">
                <p>{`${addressSelected.firstName} ${addressSelected.lastName}`}</p>
                <p>{addressSelected.address}</p>
                <p>{`${addressSelected.city}, ${addressSelected.province}, ${addressSelected.postalCode}`}</p>
                <p>{addressSelected.phoneNumber}</p>
              </div>
            </div>
            <div className="infoEdit">Edit</div>
          </div>
          <div className="infoRow">
            <div className="infoTitle">
              <div className="icon" style={{display: "inline", marginRight: "10px"}}>
                <CheckCircleOutlineIcon/>
              </div>
              Estimated delivery
            </div>
            <div className="infoDetails">
              {shippingCost === 0 && <p>2-7 business days (FREE)</p>}
              {shippingCost === 20 && <p>2-4 business days ($20.00)</p>}
              {shippingCost === 30 && <p>2-3 business days ($30.00)</p>}
            </div>
            <div className="infoEdit">Edit</div>
          </div>
        </div>
        <div className="infoCard">
          <div className="payment">
            <div className="paymentHeader">
              Payment method
            </div>
            <div className="paymentRow">
              <div className="paymentMethod">
                <img src={paypalImage} alt="Loading"/>
                <h3>Pay with PayPal</h3>
              </div>
              <div className="paypal">
                {totalPrice > 0 && <Paypal orderId={orderId} amount={totalPrice}/>}
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
              <ShoppingBagOutlinedIcon/>
              <span>{`${totalItems} ${totalItems === 1 && totalItems !== 0 ? "item" : "items"}`}</span>
              {isExpanded ? (
                <ExpandLessOutlinedIcon onClick={handleExpand}/>
              ) : (
                <ExpandMoreOutlinedIcon onClick={handleExpand}/>
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
              <span>{`$${isNaN(taxAmount) === true ? (0).toFixed(2) : taxAmount.toFixed(2)}`}</span>
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

    <ShoppingCartFooter/>
  </>
}