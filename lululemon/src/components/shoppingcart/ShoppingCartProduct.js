import AccessAlarmTwoToneIcon from "@mui/icons-material/AccessAlarmTwoTone";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  changeServerQuantity,
  fetchAllSavedItemsFromServer,
  fetchCartItems,
  removeProduct,
  saveForLater,
  saveForLaterToServer,
} from "../../redux/actions/shoppingCartActions";
import "./ShoppingCartProduct.scss";
import { OrderSummary } from "./OrderSummary";
import React, { useEffect, useState } from "react";

import { RemoveItemModal } from "./RemoveItemModal";
import { EditPopUp } from "./EditPopUp";
import { LoginModal } from "../checkout/LoginModal";
import { SavedForLater } from "./SavedForLater";

export const ShoppingCartProduct = () => {
  const shoppingCart = useSelector(
    (state) => state.shoppingCartReducer.shoppingCart,
  );
  const isLogin = useSelector((state) => state.authReducer.loginStatus);
  const savedItems = useSelector(
    (state) => state.shoppingCartReducer.savedItems,
  );
  const cartId = useSelector((state) => state.shoppingCartReducer.cartId);
  const dispatch = useDispatch();
  // const [productDetails, setProductDetails] = useState([]);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isVisibleEdit, setIsVisibleEdit] = useState(
    Array(shoppingCart.length).fill(false),
  );
  const sizesSelected = [];
  const [totalPrice, setTotalPrice] = useState(0);
  const totalItems = shoppingCart.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    console.log(cartId);
    if (cartId) dispatch(fetchAllSavedItemsFromServer());
  }, [cartId, dispatch]);
  useEffect(() => {
    const total = shoppingCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setTotalPrice(total.toFixed(2));
  }, [shoppingCart]);

  const handleCloseOut = (index) => {
    console.log("index", index, "arr", isVisibleEdit);
    const newState = isVisibleEdit.map((item, i) =>
      i === index ? !item : item,
    );
    setIsVisibleEdit(newState);
  };

  const handleQuantityChange = (e, index, itemId) => {
    const newQuantity = Number(e.target.value);

    if (isLogin) {
      const cartId = localStorage.getItem("cartId");
      dispatch(changeServerQuantity(cartId, itemId, newQuantity));
    } else {
      const updatedCart = [...shoppingCart];
      updatedCart[index].quantity = newQuantity;
      localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
      dispatch(changeQuantity(newQuantity, index));
      dispatch(fetchCartItems());
    }
  };

  const handleRemoveProduct = (
    productId,
    itemId,
    selectedSize,
    selectedColorId,
  ) => {
    console.log(
      "Removing item with ID:",
      itemId,
      "Size:",
      selectedSize,
      "Color ID:",
      selectedColorId,
    );
    dispatch(
      removeProduct(isLogin, productId, itemId, selectedSize, selectedColorId),
    );
    dispatch(fetchCartItems());
  };

  const handleCloseModal = () => {
    setIsModalOpen1(false);
    setSelectedItem(null);
  };
  const handleOpenModal = (item) => {
    setIsModalOpen1(true);
    setSelectedItem(item);
  };

  const handleOpenLoginModal = () => {
    setIsModalOpen(true);
  };
  const handleCLoseLoginModal = () => {
    setIsModalOpen(false);
  };
  const handleToSave = (item) => {
    dispatch(saveForLater(item));
  };

  const handleSaveForLaterInSaver = (itemId) => {
    dispatch(saveForLaterToServer(itemId));
  };
  return (
    <div className="shoppingCartWrapper">
      <div className="shoppingCartBody">
        <div className="itemCountContainer">
          <div className="itemCount">
            <span className="wordMyBag">My Bag </span>
            <span className="wordItem">
              ({totalItems} {totalItems > 1 ? "Items" : "Item"})
            </span>
          </div>
        </div>
        <div className="textContainer">
          <AccessAlarmTwoToneIcon />
          <p className="text">
            These items are going fast! Checkout now to make them yours.
          </p>
        </div>
        <div className="itemsContainer">
          {shoppingCart.map((item, index) => (
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
                    <button
                      className="edit button"
                      onClick={() => handleCloseOut(index)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="productDetailsRight">
                    <div className="priceContainer">
                      <div>Item Price</div>
                      <div>${Number(item.price).toFixed(2)}</div>
                    </div>
                    <div className="quantityContainer">
                      <label htmlFor={`quantity-${index}`}>Quantity</label>
                      <select
                        className="dropdownMenu"
                        id={`quantity-${index}`}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(e, index, item.id)
                        }
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
                      onClick={() => {
                        if (isLogin) {
                          handleSaveForLaterInSaver(item.id);
                        } else alert("Please log in to save items");
                      }}
                      className="save button"
                    >
                      Save for Later
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
          <div className="savedForLaterContainer">
            <h2>Saved for Later</h2>
            {isLogin === false && (
              <p>
                <span onClick={handleOpenLoginModal}>Sign in</span> or{" "}
                <span> create a member account</span> to view your saved items.
              </p>
            )}
            <div className="itemsContainer">
              {isLogin && savedItems && savedItems.length > 0 && (
                <SavedForLater
                  savedItems={savedItems}
                  handleQuantityChange={handleQuantityChange}
                  handleCloseOut={handleCloseOut}
                  handleOpenModal={handleOpenModal}
                  isVisibleEdit={isVisibleEdit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="orderSummary">
        <OrderSummary totalPrice={totalPrice} />
      </div>
      {isModalOpen1 && (
        <RemoveItemModal
          closeModal={handleCloseModal}
          handleRemoveProduct={handleRemoveProduct}
          item={selectedItem}
        />
      )}
      {isModalOpen && (
        <LoginModal
          handleModalClose={handleCLoseLoginModal}
          isSuccess={isSuccess}
          setIsSuccess={setIsSuccess}
        />
      )}
    </div>
  );
};
