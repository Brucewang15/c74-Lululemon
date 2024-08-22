import React, { useState } from "react";
import "./EditShippingFee.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setShippingCost,
  updateOrderShippingFee,
} from "../../redux/actions/shoppingCartActions";

export const EditShippingFee = ({
  setIsEditShippingFee,
  setOrderData,
  orderData,
}) => {
  const shippingFee = useSelector(
    (state) => state.shoppingCartReducer.shippingCost
  );
  const [localShippingFee, setLocalShippinFee] = useState(shippingFee);
  const dispatch = useDispatch();
  const changeShippingFee = (e) => {
    const newFee = +e.target.value;
    // console.log("newShippingFee =>", newFee);
    setLocalShippinFee(newFee);
    setOrderData((prevState) => ({
      ...prevState,
      shippingFee: newFee,
    }));
  };

  const handleSubmitNewShippingFee = async () => {
    const orderId = localStorage.getItem("orderId");
    dispatch(setShippingCost(localShippingFee));
    await updateOrderShippingFee(orderId, localShippingFee);
    setIsEditShippingFee(false);
  };
  return (
    <div
      onClick={(e) => {
        setIsEditShippingFee(false);
      }}
      className="modal-overlay"
    >
      <div onClick={(e) => e.stopPropagation()} className="modal-content">
        <div className="modal-header">
          <h2>Edit Shipping Fee</h2>

          <button
            onClick={() => setIsEditShippingFee(false)}
            className="close-button"
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="shippingMethod-wrapper">
            <label className="shippingMethod-container" htmlFor="method1">
              <input
                onClick={(e) => changeShippingFee(e)}
                type="radio"
                id="method1"
                name="shippingMethod"
                value="0"
              />
              <div className="method-container">
                <div>2-7 business days</div>
                <div>Standard shipping (FREE)</div>
              </div>
            </label>
            <label className="shippingMethod-container" htmlFor="method2">
              <input
                onClick={(e) => changeShippingFee(e)}
                type="radio"
                id="method2"
                name="shippingMethod"
                value="20"
              />
              <div className="method-container">
                <div>2-4 business days</div>
                <div>Express Shipping ($20.00)</div>
              </div>
            </label>
            <label className="shippingMethod-container" htmlFor="method3">
              <input
                onClick={(e) => changeShippingFee(e)}
                type="radio"
                id="method3"
                name="shippingMethod"
                value="30"
              />
              <div className="method-container">
                <div>2-3 business days</div>
                <div>Priority Shipping</div>
              </div>
            </label>
          </div>
        </div>
        <button onClick={handleSubmitNewShippingFee}>Confirm</button>
      </div>
    </div>
  );
};
