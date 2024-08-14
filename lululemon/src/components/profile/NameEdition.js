import "./NameEdition.css"; // Ensure you have a CSS file for styling
import { Cross } from "../icon/cross";

const NameEdition = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <Cross width={20} height={20} />
        </button>
        <h2>Edit your name</h2>
        <form className="edit-name-form">
          <div className="form-group">
            <label htmlFor="first-name">First name</label>
            <input type="text" id="first-name" name="first-name" required />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last name</label>
            <input type="text" id="last-name" name="last-name" required />
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
