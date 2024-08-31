import { EditPopUp } from "./EditPopUp";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBackToCart,
  addBackToCartToServer,
  removeSavedItem,
  saveForLaterToServer,
} from "../../redux/actions/shoppingCartActions";

export const SavedForLater = ({
  savedItems,
  handleCloseOut,
  handleQuantityChange,
  handleOpenModal,
  isVisibleEdit,
}) => {
  const dispatch = useDispatch();
  const handleAddBackToBag = (item) => {
    dispatch(addBackToCart(item));
  };
  const isLogin = useSelector((state) => state.authReducer.loginStatus);
  const handleAddBackToBagToServer = (savedItemId) => {
    dispatch(addBackToCartToServer(savedItemId));
  };

  const handleRemoveSavedItem = (savedItemId) => {
    if (isLogin) {
      dispatch(removeSavedItem(savedItemId));
    }
  };
  return (
    <div className="itemsContainer">
      {savedItems.map((item, index) => (
        <div key={index} className="itemContainer">
          <img
            className="productImage"
            src={item.image}
            alt={item.swatchName}
          />
          <div className="productDetailsContainer">
            <h3 className="productName">{item.name}</h3>
            <p className="productColor">{item.swatchName}</p>
            <div className="productDetails">
              <div className="sizeAndEditContainer">
                <div className="size">Size {item.size}</div>
                {/*<button*/}
                {/*  className="edit button"*/}
                {/*  onClick={() => handleCloseOut(index)}*/}
                {/*>*/}
                {/*  Edit*/}
                {/*</button>*/}
              </div>
              <div className="productDetailsRight">
                <div className="priceContainer">
                  <div>Item Price</div>
                  <div>${item.price.toFixed(2)}</div>
                </div>
                <div className="quantityContainer">
                  <label htmlFor={`quantity-${index}`}>Quantity</label>
                  <select
                    className="dropdownMenu"
                    id={`quantity-${index}`}
                    value="1"
                    disabled
                    // onChange={(e) => handleQuantityChange(e, index, item.id)}
                  >
                    {[...Array(5).keys()].map((i) => (
                      <option
                        className="dropdownItem"
                        key={i + 1}
                        value={i + 1}
                      >
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="totalPriceContainer">
                  <div>Total Price</div>${(item.price * 1).toFixed(2)}
                </div>
              </div>
            </div>
            <div className="shippingAndReturnContainer">
              <div>Free Shipping + Free Returns</div>
              <div className="removeContainer">
                <button
                  onClick={() => {
                    if (isLogin) {
                      handleAddBackToBagToServer(item.id);
                    } else {
                      handleAddBackToBag(item);
                    }
                  }}
                  className="save button"
                >
                  Add To Bag
                </button>
                <button
                  className="remove button"
                  onClick={() => handleRemoveSavedItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
          {isVisibleEdit[index] && (
            <EditPopUp
              productId={item.productId}
              item={item}
              sizeInit={item.size}
              colorInit={item.colorId}
              index={index}
              closeOut={handleCloseOut}
            />
          )}
        </div>
      ))}
    </div>
  );
};
