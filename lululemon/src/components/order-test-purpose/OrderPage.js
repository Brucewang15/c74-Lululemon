import axios from "axios";
import { useEffect, useState } from "react";
import { serverAPI } from "../../redux/utils/helper";
import "./OrderPage.css";
import authAxios from "../../utils/AuthAxios";

export const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(2);
  const [prevPage, setPrevPage] = useState(page - 1);
  const [nextPage, setNextPage] = useState(page + 1);
  const [totalPages, setTotalPages] = useState(0);
  // this is how many orders to show per page
  const [limit, setLimit] = useState(5);
  const [showIndex, setShowIndex] = useState(null);
  // make a new array that fits total page number, so use it to render page splitters
  let pageSelectorsArr = Array.from({ length: totalPages }, (_, i) => i + 1);
  console.log(pageSelectorsArr);

  // get the order info by user id
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchOrders = async () => {
      const res = await authAxios.get(
        `${serverAPI}/order/user/${userId}?page=${page}&limit=${limit}`
      );
      console.log(res);
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

  const handleExpand = (index) => {
    setShowIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <div>Your Orders</div>

      <div className="page-container">
        <div className="order-container">
          {orders &&
            orders.length !== 0 &&
            orders.map((order, index) => {
              return (
                <div className="orderDetails-container" key={index}>
                  <span>{index + 1}</span>
                  <div className="orderInfo-container">
                    <div>Order Id: {order.id}</div>
                    <div>Order status: {order.orderStatus}</div>
                    <div>
                      Order total before tax: ${order.totalBeforeTax.toFixed(2)}
                    </div>
                    <div>Order tax:${order.taxAmount.toFixed(2)}</div>
                    <div>Shipping Fee: ${order.shippingFee.toFixed(2)}</div>
                    <div>
                      Total After Tax: ${order.totalAfterTax.toFixed(2)}
                    </div>
                    <div
                      className="ordered-items"
                      onClick={() => handleExpand(index)}
                    >
                      Items in this order
                      <div
                        key={index}
                        className={
                          showIndex === index ? "product-info" : "hidden"
                        }
                      >
                        {order.orderItems && order.orderItems.length === 0
                          ? "No items in this order"
                          : order.orderItems.map((item, i) => {
                              return (
                                <div key={i}>
                                  <div>
                                    {" "}
                                    Product Name:
                                    {item.name}
                                  </div>
                                  <div>{item.size}</div>
                                  <img
                                    style={{ width: "20px", height: "20px" }}
                                    src={item.image}
                                    alt={item.name}
                                  />
                                </div>
                              );
                            })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <br />

        <div>This is a breaker</div>
        <div className="page-selector">
          <span>Page:</span>
          {pageSelectorsArr &&
            pageSelectorsArr.length > 0 &&
            pageSelectorsArr.map((p, i) => {
              return (
                <button
                  className={page === p ? "active-page" : "page"}
                  onClick={() => setPage(p)}
                  key={i}
                >
                  {p}
                </button>
              );
            })}
          <div className="current-page">currentPage :{page}</div>
          <div className="total-page">Total Pages : {totalPages}</div>
        </div>
      </div>
    </div>
  );
};
