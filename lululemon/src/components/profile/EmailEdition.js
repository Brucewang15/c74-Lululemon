import React, { useEffect, useState } from "react"; // Import useState
import "./EmailEdition.css"; // Ensure you have a CSS file for styling
import { Cross } from "../icon/cross";
import { useSelector } from "react-redux";
import authAxios from "../../utils/AuthAxios";
import { serverAPI } from "../../redux/utils/helper";
import { useNavigate } from "react-router-dom";
import { useAuthGuard } from "../../hook/useAuthGuard";

const EmailEdition = ({ onClose }) => {
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [errors, setErrors] = useState({ newEmail: "", confirmEmail: "" });
  const navigate = useNavigate();

  const userId = useAuthGuard();
  const user =
    useSelector((state) => state.authReducer.user) ||
    localStorage.getItem("userInfo");
  
  const originalEmail = user?.email;

  useEffect(() => {
    if (!userId) {
      console.log("Your session has expired. Do you want to log in again?");
      navigate("/login");
    }
  }, []);

  const handleNewEmailChange = (e) => {
    const { name, value } = e.target;
    setNewEmail(value);

    const errorMessage = validateForm(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleConfirmEmailChange = (e) => {
    const { name, value } = e.target;
    setConfirmEmail(value);

    const errorMessage = validateForm(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const validateForm = (name, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errorMessage = "";

    if (name === "newEmail" && !emailRegex.test(value)) {
      errorMessage = "Please enter a valid email format.";
    }

    if (name === "confirmEmail") {
      if (!emailRegex.test(value)) {
        errorMessage = "Please enter a valid email format.";
      } else if (newEmail !== confirmEmail) {
        errorMessage = "Your new email doesn’t match.";
      } else {
        errorMessage = "";
      }
    }

    return errorMessage;
  };

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
      if (name === "newEmail") {
        return "Please enter an email address.";
      } else if (name === "confirmEmail") {
        return "Please confirm email address.";
      }
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authAxios.put(
        `${serverAPI}/user/userInfo/${userId}`,
        {
          email: confirmEmail,
        }
      );

      if (response.status === 200) {
        console.log("Name updated successfully");
        onClose();
      } else {
        console.error("Failed to update name");
      }
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const hasErrors = Object.values(errors).some((error) => error !== "");
  const isDisabled = !newEmail || !confirmEmail || hasErrors;

  return (
    <div className="modal-overlay">
      <div className="change-email-modal">
        <button className="close-button" aria-label="Close" onClick={onClose}>
          <Cross width={20} height={20} />
        </button>
        <h2>Change your email</h2>

        <form className="change-email-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="current-email">Current email address</label>
            <input
              type="email"
              id="current-email"
              value={originalEmail}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="new-email">New email address</label>
            <input
              type="email"
              id="new-email"
              name="newEmail"
              required
              value={newEmail}
              onChange={handleNewEmailChange}
              onBlur={handleBlur}
            />
            {errors.newEmail && (
              <p className="error-message">{errors.newEmail}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirm-email">Confirm new email address</label>
            <input
              type="email"
              id="confirm-email"
              name="confirmEmail"
              required
              value={confirmEmail}
              onChange={handleConfirmEmailChange}
              onBlur={handleBlur}
            />
            {errors.confirmEmail && (
              <p className="error-message">{errors.confirmEmail}</p>
            )}
          </div>

          <button type="submit" className="change-button" disabled={isDisabled}>
            CHANGE EMAIL
          </button>
          <button type="button" className="underline-button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailEdition;
