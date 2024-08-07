import { useParams } from "react-router-dom";

import "./SetNewPassword.css";
import { Header } from "../shared/Header";
import Footer from "../shared/Footer";
import { useState } from "react";

export const SetNewPassword = () => {
  const { token } = useParams();
  console.log(token);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [reEnter, setReEnter] = useState(null);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordChange2 = (e) => {
    setPassword2(e.target.value);
  };

  const handleSubmit = async () => {
    if (password === password2) {
      try {
        const response = await fetch(
          `http://localhost:3399/change/changepassword/${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: password, resetToken: token }),
          },
        );

        if (response.ok) {
          console.log("ok2");
          alert("Password has changed successfully");
        } else {
          console.log("error");
        }
      } catch (err) {
        console.log("error", err);
      }
    } else {
      alert("Your passwords don't match");
    }
  };

  console.log(password, password2);
  return (
    <>
      <Header />

      <div className="main">
        <div className="container">
          <div className="title2">Enter New Password</div>
          <input
            onChange={handlePasswordChange}
            className="password"
            type="password"
          />
        </div>
        <div className="container">
          <div className="title2">Re-enter New Password</div>
          <input
            onChange={handlePasswordChange2}
            type="password"
            className="password2"
          />
        </div>
        <div className="container">
          <button onClick={handleSubmit} className="enter">
            <p>SUBMIT</p>
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};
