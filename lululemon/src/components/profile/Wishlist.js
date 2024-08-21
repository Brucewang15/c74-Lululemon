import React, { useState } from "react";
import "./Wishlist.css";
import {
  FaListUl,
  FaUserFriends,
  FaShoppingCart,
  FaChevronRight,
} from "react-icons/fa";
import DashboardLayout from "./DashboardTemplate";
import { Share } from "../icon/share";
import { Like } from "../icon/like";

const WishlistPage = () => {
  return (
    <DashboardLayout
      mainContent={<WishlistContent />}
      sidebarTitle="Wish List"
    />
  );
};

const WishlistContent = () => {
  const products = [
    {
      name: "Soft Jersey Jogger",
      color: "Legacy Green",
      size: "M",
      price: 98,
      image:
        "https://images.lululemon.com/is/image/lululemon/LM5BBXS_064494_1?wid=1440&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    },
    {
      name: "Soft Jersey Jogger",
      color: "Legacy Green",
      size: "M",
      price: 98,
      image:
        "https://images.lululemon.com/is/image/lululemon/LM5BBXS_064494_1?wid=1440&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    },
    {
      name: "Soft Jersey Jogger",
      color: "Legacy Green",
      size: "M",
      price: 98,
      image:
        "https://images.lululemon.com/is/image/lululemon/LM5BBXS_064494_1?wid=1440&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    },
    {
      name: "Soft Jersey Jogger",
      color: "Legacy Green",
      size: "M",
      price: 98,
      image:
        "https://images.lululemon.com/is/image/lululemon/LM5BBXS_064494_1?wid=1440&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    },
    {
      name: "Soft Jersey Jogger",
      color: "Legacy Green",
      size: "M",
      price: 98,
      image:
        "https://images.lululemon.com/is/image/lululemon/LM5BBXS_064494_1?wid=1440&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    },
    {
      name: "Soft Jersey Jogger",
      color: "Legacy Green",
      size: "M",
      price: 98,
      image:
        "https://images.lululemon.com/is/image/lululemon/LM5BBXS_064494_1?wid=1440&op_usm=0.8,1,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    },
  ];

  return (
    <div className="favourites-container">
      <h1>My Favourites</h1>
      <span className="visibility">Public</span>
      <header className="favourites-header">
        <div className="header-left">
          <button className="share-button">
            <Share width={20} height={20} />
            Share list
          </button>
        </div>
        <div className="header-right">
          <button className="settings-button">Settings</button>
        </div>
      </header>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card">
            <div className="image-container">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="heart-icon">
                <Like width={24} height={24} />
              </div>
            </div>
            <div className="product-details">
              <div className="product-info-line">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">${product.price}</p>
              </div>
              <div className="product-details-line">
                <p>Colour: {product.color}</p>
                <p>Size: {product.size}</p>
              </div>
              <button className="add-to-bag-button">ADD TO BAG</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
