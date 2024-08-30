import React, { useEffect, useState } from "react";
import "./PurchaseHistory.css";
import DashboardLayout from "./DashboardTemplate";
import { FileText, XCircle, ChevronDown, ChevronUp, Gift } from "lucide-react";

import { Arrow } from "../icon/arrow";
import authAxios from "../../utils/AuthAxios";
import { serverAPI } from "../../redux/utils/helper";
import { useAuthGuard } from "../../hook/useAuthGuard";
import { generateInvoicePDF } from "../../utils/createInvoice";

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
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;

  const userId = useAuthGuard();

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fetchOrders = async () => {
    try {
      const response = await authAxios.get(
        `${serverAPI}/order/userOrders/${userId}?page=${currentPage}&limit=${pageSize}`
      );
      setOrders(response.data.data.orders);
      setTotalPages(response.data.data.paginationInfo.totalPages);

      console.log(response.data.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const generatePDF = async (order) => {
    console.log(order);
    try {
      const pdfBytes = await generateInvoicePDF(order);
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `invoice_${order.id}.pdf`;
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      //await authAxios.delete(`${serverAPI}/order/${orderId}`);
      //fetchOrders();
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

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

      <div className="purchase-history">
        <h2>Purchase History</h2>
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-header-content">
                <div>
                  <p className="order-date">
                    Placed on: {formatDate(order.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="order-status">{order.orderStatus}</p>
                  <p className="order-total">
                    Total: ${order.totalAfterTax.toFixed(2)}
                  </p>
                </div>
              </div>
              {order.isGift && (
                <div className="gift-info">
                  <Gift className="gift-icon" />
                  This is a gift order
                </div>
              )}
              <button
                onClick={() => toggleOrderExpansion(order.id)}
                className="toggle-details"
                aria-expanded={expandedOrders.includes(order.id)}
              >
                {expandedOrders.includes(order.id) ? (
                  <>
                    Hide order details
                    <ChevronUp className="toggle-icon" />
                  </>
                ) : (
                  <>
                    View order details
                    <ChevronDown className="toggle-icon" />
                  </>
                )}
              </button>
              <div className="action-buttons">
                <button
                  className="generate-pdf-btn"
                  onClick={() => generatePDF(order)}
                >
                  <FileText className="pdf-icon" />
                  Generate PDF
                </button>
                {order.orderStatus === "pending" && (
                  <button
                    className="cancel-order-btn"
                    onClick={() => cancelOrder(order.id)}
                  >
                    <XCircle className="cancel-icon" />
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
            {expandedOrders.includes(order.id) && (
              <div className="order-details">
                <h3 className="section-title">Order Items</h3>
                {order.orderItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      <img
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-quantity">Quantity: {item.quantity}</p>
                      <p className="item-size">Size: {item.size}</p>
                    </div>
                    <div className="item-price">
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                <div className="address-section">
                  <h3 className="section-title">Shipping Address</h3>
                  <p>
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                  </p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p>Phone: {order.shippingAddress.phoneNumber}</p>
                </div>
                <div className="summary-section">
                  <h3 className="section-title">Order Summary</h3>
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${order.totalBeforeTax.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>${order.shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax:</span>
                    <span>${order.taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="summary-row summary-total">
                    <span>Total:</span>
                    <span>${order.totalAfterTax.toFixed(2)}</span>
                  </div>
                </div>
                {order.isGift && (
                  <div className="gift-section">
                    <h3 className="section-title">Gift Information</h3>
                    <p>From: {order.giftFrom}</p>
                    <p>To: {order.giftTo}</p>
                    <p>Message: {order.giftMessage}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

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

const HelpSection = ({ title, description }) => (
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
