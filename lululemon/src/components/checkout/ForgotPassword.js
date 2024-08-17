import { Header } from "../shared/Header";
import Footer from "../shared/Footer";
import "./ForgotPassword.css";

import { useState } from "react";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [resetToken, setResetToken] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendEmail = async () => {
    try {
      const response = await fetch(
        "http://localhost:3399/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );
      if (response.ok) {
        console.log("ok");
        const data = await response.json();
        setResetToken(data.token);
      } else {
        const errorText = await response.text();
        console.log("User Doesn't Exist");
        setResetToken("User Not Found");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <Header />

      <div className="main">
        <div className="container top">
          <div className="title">Set a new password</div>
          <div className="sub">
            Enter the email address associated with your lululemon account and
            we’ll send you a link to reset your password.
          </div>
        </div>
        <div className="container">
          <div className="email">Email Address</div>
          <input
            className="enterEmail"
            onChange={handleEmailChange}
            value={email}
            type="text"
          />
        </div>
        <div className="container">
          <button onClick={handleSendEmail}>
            <div className="button">
              <div className="text">SEND EMAIL</div>
            </div>
          </button>
        </div>

        <div className="container">
          <div className="token">
            <strong>Reset Passsword Link:</strong>{" "}
            <a href={`forgotpassword/${resetToken}`}>{resetToken}</a>
          </div>
        </div>i
      </div>

      <Footer />
    </>
  );
};
