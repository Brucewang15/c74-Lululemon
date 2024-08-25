import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import authAxios from "../../utils/AuthAxios";
import { serverAPI } from "../../redux/utils/helper";
import "./OrderDetails.css";
export const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await authAxios.get(`${serverAPI}/order/${orderId}`);
        setOrder(res.data.data.order);
      } catch (e) {
        console.log("fetching order details failed", e);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (!order) {
    return (
      <div className="loading-order">
        Loading...
        <img src="https://i.gifer.com/ZKZg.gif" alt="loading" />
      </div>
    );
  }

  return (
    <div className="order-details-container">
      <Link to={`/order/`} className="go-back">
        Go Back
      </Link>
      <h2>ORDER DETAILS Order #{order.id}</h2>
      <div className="order-info">Order status: {order.orderStatus}</div>
      <div className="order-info">Order Time: {order.createdAt}</div>
      <div className="order-items">
        {order.orderItems.map((item, index) => (
          <div key={index} className="order-item">
            <img src={item.image} alt="" />
            <div className="item-info">
              <div>Product Id: {item.productId}</div>
              <div>Product Name: {item.name}</div>
              <div>Size: {item.size}</div>
              <div>Price: ${item.price}</div>
              <div>Quantity: {item.quantity}</div>
              <div>Color: {item.swatchName}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
