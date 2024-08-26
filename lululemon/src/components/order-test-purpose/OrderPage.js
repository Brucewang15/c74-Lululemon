import axios from "axios";
import { useEffect, useState } from "react";
import { serverAPI } from "../../redux/utils/helper";
import "./OrderPage.css";
import authAxios from "../../utils/AuthAxios";
import { useNavigate } from "react-router-dom";
import { ShoppingCartHeader } from "./../shoppingcart/ShoppingCartHeader";
import { ShoppingCartFooter } from "./../shoppingcart/ShoppingCartFooter";

export const OrderPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(page - 1);
  const [nextPage, setNextPage] = useState(page + 1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  // this is how many orders to show per page
  const [limit, setLimit] = useState(6);
  const userId = localStorage.getItem("userId");

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const res = await authAxios.get(
  //         `${serverAPI}/order/user/${userId}?page=${page}&limit=${limit}`
  //       );
  //       const paginatedOrders = res.data.data.paginationInfo.paginatedOrders;
  //       const currentPage = res.data.data.paginationInfo.currentPage;
  //       const paginationInfo = res.data.data.paginationInfo;

  //       setOrders(paginatedOrders);
  //       setPage(currentPage);
  //       setNextPage(res.data.data.paginationInfo.nextPage);
  //       setPrevPage(res.data.data.paginationInfo.previousPage);
  //       setTotalPages(res.data.data.paginationInfo.totalPages);
  //     } catch (e) {
  //       console.log(e);
  //       setErrorMessage("No orders for this user yet");
  //     }
  //   };
  //   fetchOrders();
  //   // calling the api to get order infos
  // }, [page, limit, userId, order]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await authAxios.get(
          `${serverAPI}/order/user/${userId}?page=${page}&limit=${limit}`
        );
        console.log(res);

        const { paginationInfo, msg } = res.data.data;

        if (paginationInfo.totalOrders === 0) {
          setErrorMessage("No orders for this user yet");
        } else {
          setOrders(paginationInfo.paginatedOrders);
          setPage(paginationInfo.currentPage);
          setNextPage(paginationInfo.nextPage);
          setPrevPage(paginationInfo.previousPage);
          setTotalPages(paginationInfo.totalPages);
        }
      } catch (e) {
        setErrorMessage(
          e.response ? e.response.data.message : "An error occurred"
        );
      }
    };
    fetchOrders();
  }, [page, limit, userId]);

  const handleGetDetails = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (orders.length === 0) {
    return (
      <>
        <ShoppingCartHeader />
        <div
          style={{ marginTop: "250px", height: "50px" }}
          className="no-orders"
        >
          You have no orders for this user.
        </div>
      </>
    );
  }

  return (
    <>
      <ShoppingCartHeader />
      <div className="orderpage-container">
        <h2 style={{ marginTop: "50px" }}>Orders</h2>
        <>
          <div className="order-container">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div className="orderDetails-container" key={index}>
                  <span>#{order.id}</span>
                  <div className="orderInfo-container">
                    <div>{new Date(order.createdAt).toLocaleString()}</div>
                    <div>${order.totalAfterTax.toFixed(2)}</div>
                    <div>
                      {order.orderItems.length}{" "}
                      {order.orderItems.length > 1 ? "Items" : "Item"}
                    </div>
                    <div>
                      {order.shippingAddress && order.shippingAddress.firstName}{" "}
                      /{" "}
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
              ))
            ) : (
              <div className="no-orders">You have no orders.</div>
            )}
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
        </>
      </div>
      <ShoppingCartFooter />
    </>
  );
};
