import "./PasswordEdition.css"; // Ensure you have a CSS file for styling
import { Cross } from "../icon/cross";
import { Check } from "../icon/check";
import { useState } from "react";
import { See } from "../icon/see";
import { Unseen } from "../icon/unseen";

const PasswordEdition = ({ onClose }) => {
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
  });
  const [hideCurrentPassword, setHideCurrentPassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);

  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);
  const isFormValid = isPasswordValid;
  
  const toggleCurrentPwdShowHide = () => {
    setHideCurrentPassword(!hideCurrentPassword);
  };

  const toggleNewPwdShowHide = () => {
    setHideNewPassword(!hideNewPassword);
  };

  return (
    <div className="modal-overlay">
      <div class="change-password-modal">
        <button class="close-button" aria-label="Close" onClick={onClose}>
          <Cross width={20} height={20} />
        </button>
        <h2>Change your password</h2>
        <form class="change-password-form">
          <div class="form-group">
            <label for="current-password">Current password</label>
            <div class="password-input-wrapper">
              <input
                type="password"
                id="current-password"
                name="current-password"
                required
              />
              <button
                type="button"
                class="toggle-password"
                aria-label="Toggle password visibility"
              >
                <span class="eye-icon" onClick={toggleCurrentPwdShowHide}>{hideCurrentPassword ? <See /> : <Unseen />} </span>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="new-password">New password</label>
            <div class="password-input-wrapper">
              <input
                type="password"
                id="new-password"
                name="new-password"
                required
              />
              <button
                type="button"
                class="toggle-password"
                aria-label="Toggle password visibility"
              >
                <span class="eye-icon" onClick={toggleNewPwdShowHide}>{hideNewPassword ? <See /> : <Unseen />}</span>
              </button>
            </div>
          </div>

          <div className="password-criteria">
            <div className="criteria-column">
              <div
                className={`criteriaItem ${
                  passwordCriteria.length ? "met" : ""
                }`}
              >
                <div className="check">
                  <Check />
                </div>
                <p>8 characters</p>
              </div>
              <div
                className={`criteriaItem ${
                  passwordCriteria.uppercase ? "met" : ""
                }`}
              >
                <div className="check">
                  <Check />
                </div>
                <p>1 uppercase</p>
              </div>
            </div>
            <div className="criteria-column">
              <div
                className={`criteriaItem ${
                  passwordCriteria.lowercase ? "met" : ""
                }`}
              >
                <div className="check">
                  <Check />
                </div>
                <p>1 lowercase</p>
              </div>
              <div
                className={`criteriaItem ${
                  passwordCriteria.digit ? "met" : ""
                }`}
              >
                <div className="check">
                  <Check />
                </div>
                <p>1 digit</p>   
              </div>
            </div>
          </div>

          <button type="submit" class="change-button" disabled={!isFormValid}>
            CHANGE PASSWORD
          </button>
          <button type="button" className="underline-button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordEdition;
