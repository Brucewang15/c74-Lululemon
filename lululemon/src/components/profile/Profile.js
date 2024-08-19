import React, { useState } from "react";
import "./Profile.css";
import DashboardLayout from "./DashboardTemplate";
import { Plus } from "../icon/plus";
import NameEdition from "./NameEdition";
import EmailEdition from "./EmailEdition";
import PasswordEdition from "./PasswordEdition";
import ShippingAddressEdition from "./ShippingAddressEdition";
import GiftCardEdition from "./GiftCardEdition";
import CreditcardEdition from "./CreditcardEdition";

const Profile = () => {
  return (
    <DashboardLayout mainContent={<UserDetailsPage />} sidebarTitle="Profile" />
  );
};

const UserDetailsPage = () => (
  <div className="page-container">
    <h1 className="title">Your details</h1>
    <div className="user-info-grid">
      <User />
      <Account />
    </div>
    <h1 className="title">Checkout preferences</h1>
    <CheckoutPreferences />
    <h1 className="title">Communication</h1>
    <Communication />
  </div>
);

const User = () => {
  const [isNameEditOpen, setIsNameEditOpen] = useState(false);

  return (
    <div className="user section">
      <h2 className="subtitle">Profile</h2>
      <div className="field">
        <div className="nameSection">
          <label className="label">Name</label>
          <button
            className="edit-button"
            onClick={() => setIsNameEditOpen(true)}
          >
            Edit
          </button>
        </div>
        <div className="input">Enter your name...</div>
      </div>
      {isNameEditOpen && (
        <NameEdition onClose={() => setIsNameEditOpen(false)} />
      )}
    </div>
  );
};

const Account = () => {
  const [isEmailEditOpen, setIsEmailEditOpen] = useState(false);
  const [isPasswordEditOpen, setIsPasswordEditOpen] = useState(false);

  return (
    <div className="user section">
      <h2 className="subtitle">Account</h2>
      <div className="field">
        <div className="nameSection">
          <label className="label">Email</label>
          <button
            className="edit-button"
            onClick={() => setIsEmailEditOpen(true)}
          >
            Edit
          </button>
        </div>
        <div className="input">kidjokerrjerry@duck.com</div>
      </div>
      {isEmailEditOpen && (
        <EmailEdition onClose={() => setIsEmailEditOpen(false)} />
      )}
      <div className="field">
        <div className="nameSection">
          <label className="label">Password</label>
          <button
            className="edit-button"
            onClick={() => setIsPasswordEditOpen(true)}
          >
            Edit
          </button>
        </div>
        <div className="input">••••••••••</div>
        {isPasswordEditOpen && (
          <PasswordEdition onClose={() => setIsPasswordEditOpen(false)} />
        )}
      </div>
    </div>
  );
};

const CheckoutPreferences = () => {
  const [isShippingAddressEditOpen, setIsShippingAddressEditOpen] =
    useState(false);
  const [isGiftCardEditOpen, setIsGiftCardEditOpen] = useState(false);
  const [isCreditCardEditOpen, setIsCreditCardEditOpen] = useState(false);

  return (
    <div className="section">
      <div className="checkout field">
        <h2 className="subtitle">Shipping addresses</h2>
        <a
          className="add-link"
          onClick={() => setIsShippingAddressEditOpen(true)}
        >
          <Plus width={24} height={24} />
          <p className="text">Add a shipping address</p>
        </a>
      </div>
      <div className="checkout field">
        <h2 className="subtitle">Credit cards</h2>
        <a className="add-link" onClick={() => setIsCreditCardEditOpen(true)}>
          <Plus width={24} height={24} />
          <p className="text">Add a credit card</p>
        </a>
      </div>
      <div className="checkout field">
        <h2 className="subtitle">Gift cards</h2>
        <a className="add-link" onClick={() => setIsGiftCardEditOpen(true)}>
          <Plus width={24} height={24} />
          <p className="text">Add a gift card</p>
        </a>
      </div>
      {isShippingAddressEditOpen && (
        <ShippingAddressEdition
          onClose={() => setIsShippingAddressEditOpen(false)}
        />
      )}
      {isGiftCardEditOpen && (
        <GiftCardEdition onClose={() => setIsGiftCardEditOpen(false)} />
      )}
      {isCreditCardEditOpen && (
        <CreditcardEdition onClose={() => setIsCreditCardEditOpen(false)} />
      )}
    </div>
  );
};

const Communication = () => {
  const [emailsEnabled, setEmailsEnabled] = useState(false);

  return (
    <div className="section">
      <div className="communication field">
        <h2 className="subtitle">Email Communications</h2>
        <p>
          Sign up to be first to know about can't miss product drops,
          innovations, exclusive collaborations, community (and virtual) events,
          and so much more.
        </p>
        <hr />
        <div class="toggle-container">
          <label className="toggle">
            <input
              type="checkbox"
              checked={emailsEnabled}
              onChange={() => setEmailsEnabled(!emailsEnabled)}
            />
            <span className="slider"></span>
          </label>
          <span class="toggle-label">Send me emails</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
