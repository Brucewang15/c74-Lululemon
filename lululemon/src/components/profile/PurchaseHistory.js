import React, { useState } from "react";
import "./PurchaseHistory.css";
import DashboardLayout from "./DashboardTemplate";
import { Arrow } from "../icon/arrow";

const PurchaseHistory = () => {
  return (
    <DashboardLayout
      mainContent={<MainContent />}
      sidebarTitle="Purchase History"
    />
  );
};

const MainContent = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="container">
      <h1>Purchase History</h1>

      <div className="tabs">
        <Tab
          label="All"
          isActive={activeTab === "All"}
          onClick={() => setActiveTab("All")}
        />
        <Tab
          label="Online"
          isActive={activeTab === "Online"}
          onClick={() => setActiveTab("Online")}
        />
        <Tab
          label="In Store"
          isActive={activeTab === "In Store"}
          onClick={() => setActiveTab("In Store")}
        />
      </div>

      <p className="message">
        Currently you have no purchases. Start shopping our latest gear.
      </p>

      <a href="/" className="ctaButton">
        SEE WHAT'S NEW
      </a>

      <div className="contactor">
        <div className="helpSection">
          <HelpSection
            title="Live Chat is here to help."
            description="For fast support, connect with our friendly Virtual Educator and have your questions answered."
          />
          <HelpSection
            title="What do you need help with?"
            description="Our FAQ can answer any questions that may commonly be asked by our guests."
          />
        </div>

        <p className="contactMessage">
          Still need help? Contact us for any further assistance and questions.
        </p>
        <p className="email">
          <strong>EMAIL</strong>
          <div className="arrow">
            <Arrow height={20} width={20} />
          </div>
          <a href="mailto:1.877.263.9300" className="emailLink">
            1.877.263.9300
          </a>
        </p>
      </div>
    </div>
  );
};

const Tab = ({ label, isActive, onClick }) => (
  <div className={`tab ${isActive ? "activeTab" : ""}`} onClick={onClick}>
    {label}
  </div>
);

const HelpSection = ({ title, description, arrow }) => (
  <div className="helpBox">
    <div className="helpContent">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
    <span className="arrow">
      <Arrow height={30} width={30} />
    </span>
  </div>
);

export default PurchaseHistory;
