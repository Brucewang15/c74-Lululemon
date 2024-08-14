import React, { useState } from "react"; // Import useState
import "./EmailEdition.css"; // Ensure you have a CSS file for styling
import { Cross } from "../icon/cross";

const EmailEdition = ({ onClose }) => {
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNewEmailChange = (e) => {
    setNewEmail(e.target.value);
    validateForm(e.target.value, confirmEmail);
  };

  const handleConfirmEmailChange = (e) => {
    setConfirmEmail(e.target.value);
    validateForm(newEmail, e.target.value);
  };

  const validateForm = (newEmail, confirmEmail) => {
    setIsFormValid(newEmail !== "" && newEmail === confirmEmail);
  };

  return (
    <div className="modal-overlay">
      <div className="change-email-modal">
        <button className="close-button" aria-label="Close" onClick={onClose}>
          <Cross width={20} height={20} />
        </button>
        <h2>Change your email</h2>

        <form className="change-email-form">
          <div className="form-group">
            <label htmlFor="current-email">Current email address</label>
            <input
              type="email"
              id="current-email"
              value="kidjokerjerry@duck.com"
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="new-email">New email address</label>
            <input
              type="email"
              id="new-email"
              name="new-email"
              required
              value={newEmail}
              onChange={handleNewEmailChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-email">Confirm new email address</label>
            <input
              type="email"
              id="confirm-email"
              name="confirm-email"
              required
              value={confirmEmail}
              onChange={handleConfirmEmailChange}
            />
          </div>

          <button
            type="submit"
            className="change-button"
            disabled={!isFormValid}
          >
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
