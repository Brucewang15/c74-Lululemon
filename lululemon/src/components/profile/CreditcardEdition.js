import { useEffect, useState } from "react";
import "./CreditcardEdition.css";
import { Cross } from "../icon/cross";

const CreditcardEdition = ({ onClose }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    nameOnCard: "",
    sameAsShipping: false,
    country: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    setAsDefault: false,
  });

  const [errors, setErrors] = useState({
    cardNumber: "",
    expiry: "",
    nameOnCard: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [cardBrand, setCardBrand] = useState("");
  const [countries, setCountries] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

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

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    setIsDisabled(
      Object.values(formData).some((value) => value === "") || hasErrors
    );
  }, [errors]);

  const handleBlur = (e) => {
    const { id, name, value } = e.target;
    if (!value.trim()) {
      const errorMessage = validateField(name, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: errorMessage,
      }));
    }
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(sortedData);
      });
  }, []);

  const validateField = (name, value) => {
    if (name === "nameOnCard" || name === "firstName" || name === "lastName") {
      return "Please enter your name as shown on your card.";
    } else if (!value.trim()) {
      return `Please enter your ${name.toLowerCase()}.`;
    }
    return "";
  };

  const handleChange = (e) => {
    let { id, value, type, checked } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));

    if (id === "cardNumber") {
      value = value.replace(/\s/g, "");

      const errorMessage = validateCardNumber(value)
        ? ""
        : "Please enter a valid credit card number.";
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: errorMessage,
      }));

      const cardBrand = getCardBrand(value);
      setCardBrand(cardBrand);
      if (cardBrand === "Unknown") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]: "The card entered is not supported. Please select a different card type.",
        }));
      }
    } else if (id === "expiry") {
      value = value.replace(/[^\d]/g, "").slice(0, 4);

      // Automatically add '/' after the second digit
      if (value.length > 2) {
        value = `${value.slice(0, 2)}/${value.slice(2)}`;
      }

      const errorMessage = validateExpiry(value)
        ? ""
        : "Please enter a valid expiration date.";
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: errorMessage,
      }));
    } else if (id === "phoneNumber") {
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
        [id]: !phonePattern.test(value)
          ? "Please enter a valid phone number in the format."
          : "",
      }));
    }
    if (id === "postalCode") {
      value = formatPostalCode(value);

      const postalCodePattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: !postalCodePattern.test(value)
          ? "Please enter a valid postal code in the format."
          : "",
      }));
    }
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const formatPostalCode = (value) => {
    if (!value) return value;
    const postalCode = value.replace(/[^\w]/g, ""); // Remove non-alphanumeric characters
    if (postalCode.length > 3) {
      return `${postalCode.slice(0, 3)} ${postalCode.slice(3, 6)}`;
    }
    return postalCode;
  };

  const validateExpiry = (expiry) => {
    // Regular expression to match MM/YY format
    const expiryPattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

    if (!expiryPattern.test(expiry)) {
      return false;
    }

    // Extract month and year from the expiry string
    const [month, year] = expiry.split("/").map(Number);

    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Last two digits of the year
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based

    // Check if the expiry year is greater than or equal to the current year
    if (year > currentYear) {
      return true;
    } else if (year === currentYear && month >= currentMonth) {
      return true;
    }

    return false;
  };

  const getCardBrand = (cardNumber) => {
    const firstDigit = cardNumber.charAt(0);
    const firstTwoDigits = cardNumber.substring(0, 2);
    const firstSixDigits = cardNumber.substring(0, 6);

    if (firstDigit === "4") {
      return "Visa";
    } else if (firstTwoDigits === "34" || firstTwoDigits === "37") {
      return "Amex";
    } else if (
      (firstTwoDigits >= "51" && firstTwoDigits <= "55") ||
      (firstSixDigits >= "222100" && firstSixDigits <= "272099")
    ) {
      return "Mastercard";
    } else {
      return "Unknown";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const validateCardNumber = (cardNumber) => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);

      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }
    console.log(cardNumber);
    console.log(sum % 10 === 0 && cardNumber.length === 16);
    return sum % 10 === 0 && cardNumber.length === 16;
  };

  return (
    <div className="card-details-modal">
      <div className="card-details-content">
        <button className="close-button" onClick={onClose}>
          <Cross width={20} height={20} />
        </button>
        <h2>Card Details</h2>
        <div className="card-types">
          <img
            src="https://shop.lululemon.com/static/mybag/_next/static/media/visa.450802c6.svg"
            alt="Visa"
          />
          <img
            src="https://shop.lululemon.com/static/mybag/_next/static/media/mc.86b9f9f6.svg"
            alt="Mastercard"
          />
          <img
            src="https://shop.lululemon.com/static/mybag/_next/static/media/amex.5bed0ae0.svg"
            alt="American Express"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${errors.cardNumber ? "error" : ""}`}>
            <label htmlFor="cardNumber">Credit card number</label>
            <div className="card-number-wrapper">
              <input
                type="text"
                id="cardNumber"
                name="credit card number"
                value={formData.cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ")}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={19}
                required
              />
              {cardBrand && cardBrand !== "Unknown" && (
                <img className={`card-type ${cardBrand}`} />
              )}
            </div>
            {errors.cardNumber && (
              <p className="error-message">{errors.cardNumber}</p>
            )}
          </div>
          <div className={`form-group ${errors.expiry ? "error" : ""}`}>
            <label htmlFor="expiry">Expiry (MM / YY)</label>
            <input
              type="text"
              id="expiry"
              name="expiration date"
              value={formData.expiry}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.expiry && <p className="error-message">{errors.expiry}</p>}
          </div>
          <div className={`form-group ${errors.nameOnCard ? "error" : ""}`}>
            <label htmlFor="nameOnCard">Name on card</label>
            <input
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              value={formData.nameOnCard}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.nameOnCard && (
              <p className="error-message">{errors.nameOnCard}</p>
            )}
          </div>
          <div className="form-group">
            <h3>Billing address</h3>
            <div className="checkbox-group">
              <input
                type="checkbox"
                name="sameAsShipping"
                id="sameAsShipping"
                checked={formData.sameAsShipping}
                onChange={handleChange}
              />
              <label htmlFor="sameAsShipping">Same as shipping address</label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className={`form-group ${errors.firstName ? "error" : ""}`}>
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.firstName && (
              <p className="error-message">{errors.firstName}</p>
            )}
          </div>
          <div className={`form-group ${errors.lastName ? "error" : ""}`}>
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.lastName && (
              <p className="error-message">{errors.lastName}</p>
            )}
          </div>
          <div className={`form-group ${errors.phoneNumber ? "error" : ""}`}>
            <label htmlFor="phoneNumber">Phone number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phoneNumber && (
              <p className="error-message">{errors.phoneNumber}</p>
            )}
          </div>
          <div className={`form-group ${errors.address ? "error" : ""}`}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="street address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Include apt, suite, or floor number here"
              required
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
              required
            />
            {errors.city && <p className="error-message">{errors.city}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="province">Province</label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
            >
              <option value="">Select a province</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div className={`form-group ${errors.postalCode ? "error" : ""}`}>
            <label htmlFor="postalCode">Postal code</label>
            <input
              type="text"
              id="postalCode"
              name="postal code"
              value={formData.postalCode}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={7}
              required
            />
            {errors.postalCode && (
              <p className="error-message">{errors.postalCode}</p>
            )}
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="setAsDefault"
              id="setAsDefault"
              checked={formData.setAsDefault}
              onChange={handleChange}
            />
            <label htmlFor="setAsDefault">Set as default credit card</label>
          </div>
          <button type="submit" className="save-button" disabled={isDisabled}>
            SAVE CREDIT CARD
          </button>
          <button className="underline-button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreditcardEdition;
