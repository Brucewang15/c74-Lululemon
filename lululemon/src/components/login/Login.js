import React, { useState } from "react";
import "./Login.css";
import CommonCarousel from "./CommonCarousel";
import { useNavigate } from "react-router-dom";
import { Cross } from "../icon/cross";
import authAxios from "../../utils/AuthAxios";
import { serverAPI } from "../../redux/utils/helper";
import {
  loginSuccess,
  setToken,
  setUser,
} from "../../redux/actions/authAction";
import { getCartId } from "../../redux/actions/shoppingCartActions";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();

  const [isEmailVisible, setIsEmailVisible] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setIsEmailValid(re.test(email));
    if (!email) {
      setEmailError("Please enter an email address");
    } else if (!re.test(email)) {
      setEmailError(
        "Email address is not in the correct format (xxx@yyy.zzz)."
      );
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await authAxios.post(`${serverAPI}/auth/login`, {
        email,
        password,
      });

      console.log(res);
      if (res.status !== 200) {
        alert("Login failed");
        return;
      }

      alert("Login Successfully");
      const { token, user } = res.data;
      const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000;
      const {
        shoppingCart: { id: cartId },
        id: userId,
      } = user;

      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiration", expirationTime);
      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.setItem("cartId", cartId);

      dispatch(setToken(token));
      dispatch(setUser(user));
      dispatch(loginSuccess());
      dispatch(getCartId(cartId));

      navigate("/");
    } catch (e) {
      console.error("Login failed", e);
      setPasswordError(e.response.data);
    }
  };

  const handleBlur = (password) => {
    if (!password.trim()) {
      setIsPasswordValid(false);
      setPasswordError("Please enter your password");
    } else {
      setIsPasswordValid(true);
      setPasswordError("");
    }
  };

  return (
    <div className="mainContent">
      <CommonCarousel />
      <div className="loginForm">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Lululemon_Athletica_logo.svg/2048px-Lululemon_Athletica_logo.svg.png"
          alt="lululemon logo"
          className="logo"
        />
        <h1 className="titleWithLine">Sign In</h1>
        {isEmailVisible && (
          <>
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
                {emailError && (
                  <span className="error-icon">
                    <Cross width={20} height={20} />
                  </span>
                )}
              </div>
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
            <button
              type="button"
              id="email-submit"
              className="signInButton"
              onClick={() => {
                setIsEmailVisible(false);
                setIsPasswordVisible(true);
              }}
              disabled={!isEmailValid}
            >
              SIGN IN
            </button>
          </>
        )}

        {isPasswordVisible && (
          <>
            <div className={`inputGroup ${passwordError ? "error" : ""}`}>
              <p className="signInAs">
                Sign in as <strong>{email}</strong>{" "}
                <span
                  className="notYou"
                  onClick={() => {
                    setIsEmailVisible(true);
                    setIsPasswordVisible(false);
                  }}
                >
                  Not you?
                </span>
              </p>
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    e.target.value
                      ? setIsPasswordValid(true)
                      : setIsPasswordValid(false);
                  }}
                  onBlur={(e) => handleBlur(e.target.value)}
                  required
                />
                {passwordError && (
                  <span className="error-icon">
                    <Cross width={20} height={20} />
                  </span>
                )}
              </div>
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
              <span
                className="forgetPassword"
                onClick={() => {
                  navigate("/forgotpassword");
                }}
              >
                Forgot your password?
              </span>
            </div>
            <button
              type="submit"
              id="final-submit"
              className="signInButton"
              disabled={!isEmailValid || !isPasswordValid}
              onClick={handleSubmit}
            >
              SIGN IN
            </button>
          </>
        )}
        <p className="termsText">
          By signing in or creating a member account, you agree to the{" "}
          <a href="#">Terms of Use</a>
          and acknowledge the <a href="#">Privacy Policy</a>. California
          consumers, see our <a href="#">Notice of Financial Incentives</a>.
        </p>
        {isEmailVisible && (
          <button
            className="createAccountButton"
            onClick={() => navigate("/signup")}
          >
            CREATE AN ACCOUNT
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
