import React, { useState } from "react";
import "./GiftcardEdition.css";
import { Info } from "../icon/info";
import { Cross } from "../icon/cross";

const GiftCardEdition = ({ onClose }) => {
  const [giftCardNumber, setGiftCardNumber] = useState("");
  const [pin, setPin] = useState("");
  const [showGiftCardInfo, setShowGiftCardInfo] = useState(false);
  const [showPinInfo, setShowPinInfo] = useState(false);
  const [errors, setErrors] = useState({ "gift card number": "", pin: "" });

  const toggleInfo = (infoType) => {
    if (infoType === "giftCard") {
      setShowGiftCardInfo(!showGiftCardInfo);
    } else if (infoType === "pin") {
      setShowPinInfo(!showPinInfo);
    }
  };

  const hasErrors = Object.values(errors).some((error) => error !== "");
  const isDisabled = !giftCardNumber || !pin || hasErrors;

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const validateField = (name, value) => {
    if (!value.trim()) {
      return `Please enter your ${name.toLowerCase()}.`;
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasErrors) {
      console.log("Gift Card Number:", giftCardNumber);
      console.log("PIN:", pin);
      onClose();
    }
  };

  const handlePinChange = (e) => {
    const value = e.target.value;
    // Allow only digits and limit length to 6
    if (/^\d*$/.test(value) && value.length <= 6) {
      const { name, value } = e.target;
      const errorMessage = value.length < 6 ? "Please enter a valid PIN." : "";
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
      setPin(value);
    }
  };

  const handleGiftCardChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 21) {
      const { name, value } = e.target;
      const errorMessage =
        value.length < 19 ? "Please enter a valid gift card number." : "";
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
      setGiftCardNumber(value);
    }
  };

  return (
    <div className="gift-card-modal">
      <div className="gift-card-content">
        <button className="close-button" onClick={onClose}>
          <Cross width={20} height={20} />
        </button>
        <h2>Add a gift card</h2>
        <p className="instruction">
          Please keep the gift card number for your records (just in case).
        </p>
        <form onSubmit={handleSubmit}>
          <div
            className={`form-group ${
              errors["gift card number"] ? "error" : ""
            }`}
          >
            <label htmlFor="giftCardNumber">
              Gift card number
              <button
                type="button"
                className="info-icon"
                onClick={() => toggleInfo("giftCard")}
                onBlur={() => toggleInfo("giftCard")}
                aria-label="Gift card number information"
              >
                <Info width={20} height={20} />
              </button>
              {showGiftCardInfo && (
                <p className="info-text">
                  The gift card number is on the back of your physical gift
                  card.
                </p>
              )}
            </label>
            <input
              type="text"
              id="giftCardNumber"
              name="gift card number"
              value={giftCardNumber}
              onChange={handleGiftCardChange}
              onBlur={handleBlur}
              required
            />
            {errors["gift card number"] && (
              <p className="error-message">{errors["gift card number"]}</p>
            )}
          </div>
          <div className={`form-group ${errors.pin ? "error" : ""}`}>
            <label htmlFor="pin">
              PIN
              <button
                type="button"
                className="info-icon"
                onClick={() => toggleInfo("pin")}
                onBlur={() => toggleInfo("pin")}
                aria-label="PIN information"
              >
                <Info width={20} height={20} />
              </button>
              {showPinInfo && (
                <p className="info-text">
                  The gift card number is on the back of your physical gift
                  card.
                </p>
              )}
            </label>
            <input
              type="text"
              name="pin"
              id="pin"
              maxLength={6}
              value={pin}
              onChange={handlePinChange}
              onBlur={handleBlur}
              required
            />
            {errors.pin && <p className="error-message">{errors.pin}</p>}
          </div>
          <button
            type="submit"
            className="add-gift-card-button"
            disabled={isDisabled}
          >
            ADD GIFT CARD
          </button>
          <button type="button" className="underline-button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default GiftCardEdition;
