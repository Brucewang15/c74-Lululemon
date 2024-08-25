import axios from "axios";
import { useEffect, useState } from "react";
import { serverAPI } from "../../redux/utils/helper";
import "./OrderPage.css";
import authAxios from "../../utils/AuthAxios";
import { useNavigate } from "react-router-dom";

export const OrderPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(page - 1);
  const [nextPage, setNextPage] = useState(page + 1);
  const [totalPages, setTotalPages] = useState(0);
  // this is how many orders to show per page
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchOrders = async () => {
      const res = await authAxios.get(
        `${serverAPI}/order/user/${userId}?page=${page}&limit=${limit}`
      );
      const paginatedOrders = res.data.data.paginationInfo.paginatedOrders;
      const currentPage = res.data.data.paginationInfo.currentPage;
      setOrders(paginatedOrders);
      setPage(currentPage);
      setNextPage(res.data.data.paginationInfo.nextPage);
      setPrevPage(res.data.data.paginationInfo.previousPage);
      setTotalPages(res.data.data.paginationInfo.totalPages);
    };
    fetchOrders();
    // calling the api to get order infos
  }, [page, limit]);

  const handleGetDetails = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="page-container">
      <h2>Orders</h2>
      <div className="order-container">
        {orders &&
          orders.length !== 0 &&
          orders.map((order, index) => (
            <div className="orderDetails-container" key={index}>
              <span>#{order.id}</span>
              <div className="orderInfo-container">
                <div>{new Date(order.createdAt).toLocaleString()}</div>
                <div>${order.totalAfterTax.toFixed(2)}</div>
                <div>{order.orderItems.length} Items</div>
                <div>
                  {order.shippingAddress && order.shippingAddress.firstName} /{" "}
                  {order.shippingAddress && order.shippingAddress.lastName}
                </div>
                <div>
                  {order.shippingAddress && order.shippingAddress.province},{" "}
                  {order.shippingAddress && order.shippingAddress.country}
                </div>
                <div>{order.orderStatus}</div>
              </div>
              <button
                className="ordered-items"
                onClick={() => handleGetDetails(order.id)}
              >
                Check Order Details
              </button>
            </div>
          ))}
      </div>

      <div className="page-selector">
        <span>Page:</span>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p, i) => (
          <button
            className={page === p ? "active-page" : "page"}
            onClick={() => setPage(p)}
            key={i}
          >
            {p}
          </button>
        ))}
        <div className="current-page">currentPage :{page}</div>
        <div className="total-page">Total Pages : {totalPages}</div>
      </div>
    </div>
  );
};
