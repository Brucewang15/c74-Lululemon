import "./NameEdition.css"; // Ensure you have a CSS file for styling
import { Cross } from "../icon/cross";
import { useState } from "react";
import axios from "axios";
import { serverAPI } from "../../redux/utils/helper";
import authAxios from "../../utils/AuthAxios";
import { useSelector } from "react-redux";

const NameEdition = ({ onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const userId =
    useSelector((state) => state.authReducer.user).id ||
    JSON.parse(localStorage.getItem("userInfo")).id;

  console.log(userId);
  const [errors, setErrors] = useState({
    "first name": "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authAxios.put(`${serverAPI}/user/userInfo/${userId}`, {
        firstName,
        lastName,
      });

      if (response.status === 200) {
        console.log("Name updated successfully");
        onClose(); // Close the modal or perform other actions
      } else {
        console.error("Failed to update name");
      }
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const hasErrors = Object.values(errors).some((error) => error !== "");
  const isDisabled = !firstName || hasErrors;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <Cross width={20} height={20} />
        </button>
        <h2>Edit your name</h2>
        <form className="edit-name-form" onSubmit={handleSubmit}>
          <div className={`form-group ${errors["first name"] ? "error" : ""}`}>
            <label htmlFor="first-name">First name</label>
            <input
              type="text"
              id="first-name"
              name="first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={handleBlur}
              required
            />
            {errors["first name"] && (
              <p className="error-message">{errors["first name"]}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last name</label>
            <input
              type="text"
              id="last-name"
              name="last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="save-button" disabled={isDisabled}>
            SAVE NAME
          </button>
          <button type="button" className="underline-button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameEdition;
