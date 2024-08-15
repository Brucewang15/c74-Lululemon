import React, { useState } from "react";
import "./ShippingAddressEdition.css";
import { Cross } from "../icon/cross";

const validateField = (name, value) => {
  if (!value.trim()) {
    return `Please enter your ${name.toLowerCase()}.`;
  }
  return "";
};

const formatPostalCode = (value) => {
  if (!value) return value;
  const postalCode = value.replace(/[^\w]/g, ""); // Remove non-alphanumeric characters
  if (postalCode.length > 3) {
    return `${postalCode.slice(0, 3)} ${postalCode.slice(3, 6)}`;
  }
  return postalCode;
};

const ShippingAddressEdition = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    isDefaultAddress: false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const hasErrors = Object.values(errors).some((error) => error !== "");

  const provinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "postalCode") {
      const formattedPostalCode = formatPostalCode(value);
      setFormData((prevData) => ({
        ...prevData,
        postalCode: formattedPostalCode,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      const errorMessage = validateField(key, formData[key]);
      if (errorMessage) {
        validationErrors[key] = errorMessage;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Form submitted:", formData);
      // Handle form submission logic here
    }
  };

  return (
    <div className="modal-overlay">
      <div className="shipping-address-form">
        <button className="close-button" aria-label="Close" onClick={onClose}>
          <Cross width={20} height={20} />
        </button>
        <h2>Add your shipping address</h2>

        <form onSubmit={handleSubmit}>
          <div className={`form-group ${errors.firstName ? "error" : ""}`}>
            <label htmlFor="firstName">First name</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.firstName && (
              <p className="error-message">{errors.firstName}</p>
            )}
          </div>

          <div className={`form-group ${errors.lastName ? "error" : ""}`}>
            <label htmlFor="lastName">Last name</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.lastName && (
              <p className="error-message">{errors.lastName}</p>
            )}
          </div>

          <div className={`form-group ${errors.phoneNumber ? "error" : ""}`}>
            <label htmlFor="phoneNumber">Phone number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phoneNumber && (
              <p className="error-message">{errors.phoneNumber}</p>
            )}
            <p className="help-text">
              This will only be used for delivery related issues.
            </p>
          </div>

          <div className={`form-group ${errors.address ? "error" : ""}`}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Include apt, suite, or floor number here"
            />
            {errors.address && (
              <p className="error-message">{errors.address}</p>
            )}
          </div>

          <div className={`form-group ${errors.city ? "error" : ""}`}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.city && (
              <p className="error-message">{errors.city}</p>
            )}
          </div>

          <div className={`form-group ${errors.province ? "error" : ""}`}>
            <label htmlFor="province">Province</label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select...</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            {errors.province && (
              <p className="error-message">{errors.province}</p>
            )}
          </div>

          <div className={`form-group ${errors.postalCode ? "error" : ""}`}>
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={7}
            />
            {errors.postalCode && (
              <p className="error-message">{errors.postalCode}</p>
            )}
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="defaultAddress"
              name="isDefaultAddress"
              checked={formData.isDefaultAddress}
              onChange={handleChange}
            />
            <label htmlFor="defaultAddress">
              Set as default shipping address
            </label>
          </div>

          <button type="submit" className="submit-button" disabled={hasErrors}>
            SAVE ADDRESS
          </button>
          <button type="button" className="underline-button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingAddressEdition;