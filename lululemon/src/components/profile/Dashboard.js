// DashboardLayout.js
import React from "react";
import "./Dashboard.css";
import { Arrow } from "../icon/arrow";
import DashboardLayout from "./DashboardTemplate";

export const Dashboard = () => {
  return (
    <DashboardLayout mainContent={<MainContent />} sidebarTitle="Dashboard" />
  );
};

const MainContent = () => {
  const cardData = [
    { title: "Addresses", description: "Add or edit your shipping addresses." },
    { title: "Payments", description: "Add or edit your payment methods." },
    {
      title: "Profile",
      description: "Edit your name, email, password, and email preferences.",
    },
    {
      title: "Membership Benefits",
      description:
        "Explore benefits and get answers to frequently asked questions.",
    },
  ];

  return (
    <div className="content-area">
      <div className="greeting-section">
        <h1 className="greeting">Hi there</h1>
        <p className="membership-status">LULULEMON ESSENTIAL MEMBER</p>
      </div>

      <div className="info-grid">
        {cardData.map((card, index) => (
          <InfoCard
            key={index}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

const InfoCard = ({ title, description }) => {
  return (
    <div className="info-card">
      <div className="info-card-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <span className="info-card-arrow">
        <Arrow width={30} height={30} />
      </span>
    </div>
  );
};
