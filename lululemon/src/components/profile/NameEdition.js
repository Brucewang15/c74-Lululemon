import "./NameEdition.css"; // Ensure you have a CSS file for styling
import { Cross } from "../icon/cross";
import { useState } from "react";

const NameEdition = ({ onClose }) => {
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

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <Cross width={20} height={20} />
        </button>
        <h2>Edit your name</h2>
        <form className="edit-name-form">
          <div className={`form-group ${
              errors["first name"] ? "error" : ""
            }`}>
            <label htmlFor="first-name">First name</label>
            <input
              type="text"
              id="first-name"
              name="first name"
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
              required
            />
          </div>
          <button type="submit" className="save-button">
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
