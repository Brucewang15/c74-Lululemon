import { useState } from "react";
import "./Signup.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { Check } from "../icon/check";
import { See } from "../icon/see";
import { Unseen } from "../icon/unseen";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
  });

  const navigator = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail(email);
  };

  const handleGoBackHome = () => {
    navigator("/");
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setIsEmailValid(re.test(email));
    if (!email) {
      setEmailError("Please enter an email address");
    } else if (!re.test(email)) {
      setEmailError(
        "Email address is not in the correct format (xxx@yyy.zzz). Please correct the email address."
      );
    } else {
      setEmailError("");
    }
  };

  const isEmptyPassword = (password) => {
    if (!password) {
      setPasswordError("Please enter your password");
    }
  };

  const validatePassword = (password) => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
    });
  };

  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);

  const isFormValid = isEmailValid && isPasswordValid;

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const toggleShowHide = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <main className="mainContent">
      <div className="imageGallery">
        <div className="back-button-container">
          <button
            className="back-button"
            aria-label="Back"
            onClick={handleGoBackHome}
          >
            <span className="arrow">
              <svg
                height="16"
                width="16"
                fill="none"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                focusable="false"
                role="img"
                aria-hidden="true"
              >
                <path
                  d="m.215 7 5-5 .35.35a1 1 0 0 1 0 1.42l-3 3h9.18v.5a1 1 0 0 1-1 1h-8.19l3 3a1 1 0 0 1 0 1.42l-.35.35-5-5A.75.75 0 0 1 .215 7Zm14.53 1.28h-2v-.5a1 1 0 0 1 1-1h2v.5a1 1 0 0 1-1 1Z"
                  fill="#000"
                ></path>
              </svg>
            </span>
            <span className="text">BACK</span>
          </button>
        </div>

        <Slider {...carouselSettings}>
          <div className="slide">
            <img
              src="https://images.lululemon.com/is/image/lululemon/NA_Jul24_Membership_Partner-Perks_LogInScreen_Main_Sign-in_D_Membership"
              alt="Lifestyle 1"
            />
            <div className="partnerPerks">
              <h2>Partner Perks</h2>
              <p>
                Move, fuel, and restore with brands we trust. You'll find new
                ways to support your wellbeing, your way, with member-only
                offers from Oura, La La Land, Barry's, Erewhon, Life Time, and
                more.
              </p>
            </div>
          </div>
          <div className="slide">
            <img
              src="https://images.lululemon.com/is/image/lululemon/NA_Jul24_Membership_Partner-Perks_LogInScreen_Main_Sign-in_D_PartnerPerks"
              alt="Lifestyle 2"
            />
            <div className="partnerPerks">
              <h2>Exclusive Access</h2>
              <p>
                Get early access to new products and limited editions, tailored
                just for our members.
              </p>
            </div>
          </div>
        </Slider>
      </div>
      <div className="formContainer">
        <div className="signupForm">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Lululemon_Athletica_logo.svg/2048px-Lululemon_Athletica_logo.svg.png"
            alt="lululemon logo"
            className="logo"
          />
          <h1 className="titleWithLine">Create a member account</h1>
          <form onSubmit={handleSubmit}>
            <div className={`inputGroup ${emailError ? "error" : ""}`}>
              <label htmlFor="email">Email address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  onBlur={(e) => validateEmail(e.target.value)}
                  required
                />
                {emailError && <span className="error-icon">×</span>}
              </div>
              {emailError && (
                <span className="error-message">{emailError}</span>
              )}
            </div>
            <div className={`inputGroup ${passwordError ? "error" : ""}`}>
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type={hidePassword ? "password" : "text"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  onBlur={(e) => isEmptyPassword(e.target.value)}
                  required
                />
                <span className="showOrHiddenPassword" onClick={toggleShowHide}>
                  {hidePassword ? <See /> : <Unseen />}
                </span>
              </div>
              {passwordError && (
                <span className="error-message">{passwordError}</span>
              )}
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
            </div>
            <div className="checkboxGroup">
              <input
                type="checkbox"
                id="optIn"
                checked={optIn}
                onChange={(e) => setOptIn(e.target.checked)}
              />
              <label htmlFor="optIn">
                Opt in to receive our weekly emails and member communications.
                You'll be the first to know about new gear and more. (You can
                unsubscribe at any time)
              </label>
            </div>
            <button
              type="submit"
              className="createAccountButton"
              disabled={!isFormValid}
            >
              CREATE A LULULEMON ACCOUNT
            </button>
          </form>
          <p className="termsText">
            By clicking "Create Member Account" you agree to the Terms of Use
            and to join lululemon Membership. See our Privacy Policy for details
            about our information practices. California consumers, also see our
            Notice of Financial Incentives. lululemon will use information you
            submit (including identifiers, commercial information, and internet
            or other electronic network activity information) to fulfill this
            request.
          </p>
          <button className="signInButton">SIGN IN</button>
        </div>
      </div>
    </main>
  );
};
