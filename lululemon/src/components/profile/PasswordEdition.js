import "./PasswordEdition.css"; // Ensure you have a CSS file for styling
import { Cross } from "../icon/cross";
import { Check } from "../icon/check";
import { useEffect, useState } from "react";
import { See } from "../icon/see";
import { Unseen } from "../icon/unseen";

const PasswordEdition = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
  });

  const [errors, setErrors] = useState({
    "current password": "",
    "new password": "",
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

  const [hideCurrentPassword, setHideCurrentPassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);

  const validatePassword = (password) => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
    });
  };

  useEffect(() => {
    const result = Object.values(passwordCriteria).every(Boolean);
    setIsPasswordValid(result);
    const errorMessage = !newPassword ||result
      ? ""
      : "Your new password doesn’t meet the requirements.";
    setErrors((prevErrors) => ({
      ...prevErrors,
      ["new password"]: errorMessage,
    }));
  }, [passwordCriteria]);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    validatePassword(e.target.value);
  };

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
                type={hideCurrentPassword ? "password" : "text"}
                id="current-password"
                name="current password"
                required
                onBlur={handleBlur}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                class="toggle-password"
                aria-label="Toggle password visibility"
              >
                <span class="eye-icon" onClick={toggleCurrentPwdShowHide}>
                  {hideCurrentPassword ? <See /> : <Unseen />}{" "}
                </span>
              </button>
              {errors["current password"] && (
                <p className="error-message">{errors["current password"]}</p>
              )}
            </div>
          </div>

          <div class="form-group">
            <label for="new-password">New password</label>
            <div class="password-input-wrapper">
              <input
                type={hideNewPassword ? "password" : "text"}
                id="new-password"
                name="new password"
                required
                onBlur={handleBlur}
                onChange={handleNewPasswordChange}
              />
              <button
                type="button"
                class="toggle-password"
                aria-label="Toggle password visibility"
              >
                <span class="eye-icon" onClick={toggleNewPwdShowHide}>
                  {hideNewPassword ? <See /> : <Unseen />}
                </span>
              </button>
              {errors["new password"] && (
                <p className="error-message">{errors["new password"]}</p>
              )}
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

          <button
            type="submit"
            class="change-button"
            disabled={!isPasswordValid}
          >
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
