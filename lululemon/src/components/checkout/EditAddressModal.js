import React, { useEffect, useState } from "react";
import "./EditAddressModal.css";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { editAddress } from "../../redux/actions/authAction";

export const EditAddressModal = ({ selectedAddress, handleCloseModal }) => {
  const dispatch = useDispatch();
  const userId =
    useSelector((state) => state.authReducer.userId) ||
    localStorage.getItem("userId");

  const [formData, updateFormData] = useState({
    country: "",
    province: "",
    city: "",
    postalCode: "",
    address: "",
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (selectedAddress) {
      updateFormData({
        country: selectedAddress.country || "",
        province: selectedAddress.province || "",
        city: selectedAddress.city || "",
        postalCode: selectedAddress.postalCode || "",
        address: selectedAddress.address || "",
        email: selectedAddress.email || "",
        phoneNumber: selectedAddress.phoneNumber || "",
        firstName: selectedAddress.firstName || "",
        lastName: selectedAddress.lastName || "",
      });
    }
  }, [selectedAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleEditAddress = () => {
    dispatch(editAddress(userId, selectedAddress.id, formData));
    handleCloseModal();
  };

  return (
    <div onClick={handleCloseModal} className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Shipping Address</h2>
          <button onClick={handleCloseModal} className="close-button">
            <CloseIcon />
          </button>
        </div>
        <div className="input-group">
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="deliveryNote">Delivery note (Optional)</label>
          <input type="text" id="deliveryNote" name="deliveryNote" />
        </div>
        <div className="input-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="province">Province</label>
          <input
            id="province"
            name="province"
            value={formData.province}
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="input-group">
          <label htmlFor="postalCode">Postal code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleEditAddress} className="save-button">
          SAVE CHANGES
        </button>
        <button className="cancel-button" onClick={handleCloseModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};
