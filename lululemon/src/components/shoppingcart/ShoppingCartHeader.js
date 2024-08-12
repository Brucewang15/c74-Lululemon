import PermIdentitySharpIcon from "@mui/icons-material/PermIdentitySharp";
import "./ShoppingCartHeader.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { LoginModal } from "../checkout/LoginModal";
import { logout } from "../../redux/actions/authAction";

export const ShoppingCartHeader = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.authReducer.user);
  const isLogin = useSelector((state) => state.authReducer.loginStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const handleOpenLoginModal = () => {
    setIsModalOpen(true);
  };
  const handleCLoseLoginModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartId");
  };
  return (
    <div className="shoppingCartHeader">
      <img
        onClick={() => navigate("/")}
        src="https://hucksterdesign.com/wp-content/uploads/2020/12/lululemon-logo.jpg"
        alt="logo"
      />
      <div
        className="signInContainer"
        onClick={() => {
          if (isLogin === false) handleOpenLoginModal();
        }}
      >
        <PermIdentitySharpIcon />{" "}
        {isLogin === false ? (
          <div className="signIn hover">Sign in</div>
        ) : (
          <div className="userName hover">
            {userInfo.firstName} {userInfo.lastName}
          </div>
        )}
        {isLogin && (
          <div className="logOut hover" onClick={handleLogout}>
            Log Out
          </div>
        )}
      </div>
      {isModalOpen && (
        <LoginModal
          handleModalClose={handleCLoseLoginModal}
          isSuccess={isSuccess}
          setIsSuccess={setIsSuccess}
          isLogin={isLogin}
        />
      )}
    </div>
  );
};
