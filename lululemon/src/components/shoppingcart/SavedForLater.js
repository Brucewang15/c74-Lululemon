import { EditPopUp } from "./EditPopUp";
import React from "react";
import { useDispatch } from "react-redux";
import { addBackToCart } from "../../redux/actions/shoppingCartActions";

export const SavedForLater = ({
  savedShoppingCart,
  handleCloseOut,
  handleQuantityChange,
  handleOpenModal,
  isVisibleEdit,
}) => {
  const dispatch = useDispatch();
  const handleAddBackToBag = (item) => {
    dispatch(addBackToCart(item));
  };

  return (
    <div className="itemsContainer">
      {savedShoppingCart.map((item, index) => (
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
                  <div>Total Price</div>$
                  {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
            <div className="shippingAndReturnContainer">
              <div>Free Shipping + Free Returns</div>
              <div className="removeContainer">
                <button
                  onClick={() => handleAddBackToBag(item)}
                  className="save button"
                >
                  Add To Bag
                </button>
                <button
                  className="remove button"
                  onClick={() => handleOpenModal(item)}
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
