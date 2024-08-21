import React, { useEffect, useState } from "react";
import "./LoginModal.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { myKey, serverAPI } from "../../redux/utils/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  logout,
  setToken,
  setUser,
  setUserId,
} from "../../redux/actions/authAction";
import { Link } from "react-router-dom";
import { getCartId } from "../../redux/actions/shoppingCartActions";

export const LoginModal = ({
  handleModalClose,
  isSuccess,
  setIsSuccess,
  isLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  // markxu@itlab.com
  // ITLabAPI@2024
  useEffect(() => {
    if (isLogin || isSuccess) {
      handleModalClose();
    }
  }, [isSuccess, handleModalClose, isLogin]);
  const handleSignIn = () => {
    axios
      .post(`${serverAPI}/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        const token = res.data.token;
        const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000;
        // const expirationTime = new Date().getTime() + 5 * 1000;
        const userInfo = res.data.user;
        const cartId = res.data.user.shoppingCart.id;
        const userId = res.data.user.id;
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiration", expirationTime);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        localStorage.setItem("cartId", cartId);

        dispatch(setToken(token));
        dispatch(setUser(userInfo));
        dispatch(loginSuccess());
        dispatch(getCartId(cartId));
        dispatch(setUserId(userId));

        setTimeout(
          () => {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiration");
            localStorage.removeItem("userInfo");
            dispatch(logout()); // Dispatch a logout action
            alert("Your session has expired. Please log in again.");
          },
          2 * 60 * 60 * 1000,
        ); // 2 hours

        setMessage("Login successful");
        setIsSuccess(true);
      })
      .catch((err) => {
        setMessage(`Something's not right with your email address or password`);
        console.error("Error logging in", err);
        setIsSuccess(false);
      });
    console.log(message);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Make shopping even easier.</h2>
          <button className="close-button" onClick={handleModalClose}>
            <CloseIcon />
          </button>
        </div>
        <p>Speedy checkout, easy returns & more await.</p>
        <h3>Sign in to your member account</h3>
        {message && (
          <p className={isSuccess === true ? "loginSuccess" : "loginFail"}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => {
                handleEmailInput(e);
              }}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => {
                handlePasswordInput(e);
              }}
              required
            />
            <Link className="forgot-password" to={"/forgotpassword"}>
              Forgot your password?
            </Link>
          </div>
          <button type="submit" className="login-button" onClick={handleSignIn}>
            SIGN IN
          </button>
        </form>
        <p className="disclaimer">
          By signing in, you agree to the <a href="#">Terms of Use</a> and
          acknowledge the <a href="#">Privacy Policy</a>.
        </p>
        <button onClick={handleModalClose} className="guest-button">
          Continue as a guest
        </button>
      </div>
    </div>
  );
};
