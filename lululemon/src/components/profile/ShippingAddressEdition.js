import React, { useState } from "react";
import "./ShippingAddressEdition.css";
import { Cross } from "../icon/cross";
import authAxios from "../../utils/AuthAxios";
import { serverAPI } from "../../redux/utils/helper";
import { useSelector } from "react-redux";

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
  const userId =
    useSelector((state) => state.authReducer.user).id ||
    JSON.parse(localStorage.getItem("userInfo")).id;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    country: "Canada",
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
  const isDisabled =
    Object.values(formData).some((value) => value === "") || hasErrors;

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
    let { name, value, type, checked } = e.target;
    if (name === "postalCode") {
      value = formatPostalCode(value);

      const postalCodePattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: !postalCodePattern.test(value)
          ? "Please enter a valid postal code in the format."
          : "",
      }));
    } else if (name === "phoneNumber") {
      let formattedPhoneNumber = value.replace(/[^\d]/g, ""); // Remove non-digit characters
      if (formattedPhoneNumber.length > 10) {
        formattedPhoneNumber = formattedPhoneNumber.slice(0, 10); // Limit to 10 digits
      }
      if (formattedPhoneNumber.length > 0) {
        formattedPhoneNumber = `(${formattedPhoneNumber}`;
      }
      if (formattedPhoneNumber.length > 4) {
        formattedPhoneNumber = `${formattedPhoneNumber.slice(
          0,
          4
        )}) ${formattedPhoneNumber.slice(4)}`;
      }
      if (formattedPhoneNumber.length > 9) {
        formattedPhoneNumber = `${formattedPhoneNumber.slice(
          0,
          9
        )}-${formattedPhoneNumber.slice(9)}`;
      }
      value = formattedPhoneNumber;

      const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: !phonePattern.test(value)
          ? "Please enter a valid phone number in the format."
          : "",
      }));
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (!value.trim()) {
      const errorMessage = validateField(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "isDefaultAddress") {
        const errorMessage = validateField(key, formData[key]);
        if (errorMessage) {
          validationErrors[key] = errorMessage;
        }
      }
      if (key === "phoneNumber") {
        let formattedPhoneNumber = formData[key].replace(/[^\d]/g, "");
        formData[key] = formattedPhoneNumber;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await authAxios.post(
          `${serverAPI}/user/userInfo/${userId}/address`,
          JSON.parse(JSON.stringify(formData))
        );

        if (response.status === 200) {
          alert("Address added successfully");
          onClose();
        } else {
          console.error("Failed to add shipping address");
          setErrors((prevErrors) => ({
            ...prevErrors,
            ["current password"]: response.data.msg,
          }));
        }
      } catch (error) {
        console.error("Error updating password:", error);
      }
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
            {errors.city && <p className="error-message">{errors.city}</p>}
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

          <button type="submit" className="submit-button" disabled={isDisabled}>
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
