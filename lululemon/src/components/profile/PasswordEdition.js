import "./PasswordEdition.css"; // Ensure you have a CSS file for styling
import { Cross } from "../icon/cross";
import { Check } from "../icon/check";
import { useEffect, useState } from "react";
import { See } from "../icon/see";
import { Unseen } from "../icon/unseen";
import { serverAPI } from "../../redux/utils/helper";
import authAxios from "../../utils/AuthAxios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/authAction";

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    const errorMessage =
      !newPassword || result
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authAxios.post(
        `${serverAPI}/user/userInfo/updatePassword`,
        {
          currentPassword,
          newPassword,
        }
      );

      console.log(response);
      if (response.status === 200 && response.data.status === 200) {
        console.log("Password updated successfully");
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        localStorage.removeItem("userInfo");
        dispatch(logout()); // Dispatch a logout action
        alert("Your session has expired. Please log in again.");

        onClose();
        navigate("/login");
      } else {
        console.error("Failed to update password");
        setErrors((prevErrors) => ({
          ...prevErrors,
          ["current password"]: response.data.msg,
        }));
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div class="change-password-modal">
        <button class="close-button" aria-label="Close" onClick={onClose}>
          <Cross width={20} height={20} />
        </button>
        <h2>Change your password</h2>
        <form class="change-password-form" onSubmit={handleSubmit}>
          <div class="form-group">
            <label htmlFor="current-password">Current password</label>
            <div class="password-input-wrapper">
              <input
                type={hideCurrentPassword ? "password" : "text"}
                id="current-password"
                name="current password"
                required
                onBlur={handleBlur}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
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
            <label htmlFor="new-password">New password</label>
            <div class="password-input-wrapper">
              <input
                type={hideNewPassword ? "password" : "text"}
                id="new-password"
                name="new password"
                required
                onBlur={handleBlur}
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
              <button
                type="button"
                className="toggle-password"
                aria-label="Toggle password visibility"
              >
                <span class="eye-icon" onClick={toggleNewPwdShowHide}>
                  {hideNewPassword ? <See /> : <Unseen />}
                </span>
              </button>
            </div>
            {errors["new password"] && (
              <p className="error-message">{errors["new password"]}</p>
            )}
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
