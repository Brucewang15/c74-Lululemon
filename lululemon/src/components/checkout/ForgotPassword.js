import { Header } from "../shared/Header";
import Footer from "../shared/Footer";
import "./ForgotPassword.css";
import { useState } from "react";


import Mailgun from 'mailgun.js'
import formData from 'form-data'


export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [resetToken, setResetToken] = useState("");







  // logs any error





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

        const mailgun = new Mailgun(formData)
        const mg = mailgun.client({
          username: 'api',
          key: 'bc8f2e60dddd41f487d4b60e80d41b2d-777a617d-97da2d90'
        })

        mg.messages.create('sandbox151b0eb017d14b21b65e00970ee97aed.mailgun.org', {
          from: "Excited User <mailgun@sandbox151b0eb017d14b21b65e00970ee97aed.mailgun.org>",
          to: email,
          subject: "localhost:3000/forgotpassword/" +data.token,
          html: "<p>Copy the link in the subject and paste it into your browser to reset your password!</p>"

        })
            .then(msg => console.log("message", msg)) // logs response data
            .catch(err => console.log(err));

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

            {resetToken !== ""
                ? "check your email!"
                : ""
            }

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
