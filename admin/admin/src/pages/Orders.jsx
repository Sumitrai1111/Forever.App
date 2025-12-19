import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App.jsx";
import { assets } from "../assets/assets.js";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>
        <b>Order Page</b>
      </h3>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-xm text-gray-700"
          >
            <img src={assets.parcel_icon} className="w-12" alt="parcel-icon" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p key={index} className="py-0.5">
                        <b>
                          {item.name} x {item.quantity} <span>{item.size}</span>
                        </b>
                      </p>
                    );
                  } else {
                    return (
                      <p key={index} className="py-0.5">
                        <b>
                          {item.name} x {item.quantity} <span>{item.size}</span>{" "}
                          ,
                        </b>
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium text-red-700">
                <b>{order.address.firstName + " " + order.address.lastName}</b>
              </p>
              <div>
                <p>
                  <b>{order.address.street + ","}</b>
                </p>
                <p>
                  <b>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}
                  </b>
                </p>
              </div>
              <p>
                <b>{order.address.phone}</b>
              </p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                <b>Items : {order.items.length}</b>
              </p>
              <p className="mt-3 ">
                <b>Method : {order.paymentMethod}</b>
              </p>
              <p>
                <b>Payment : {order.payment ? "Done" : "Pending"}</b>
              </p>
              <p>
                <b>Date : {new Date(order.date).toLocaleDateString()}</b>
              </p>
            </div>
            <p className="text-xm sm:text-[15px]">
              <b>
                {currency}
                {order.amount}
              </b>
            </p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="p-2 font-semibold"
            >
              <option value="Order Placed">
                <b>Order Placed</b>
              </option>
              <option value="Packing">
                <b>Packing</b>
              </option>
              <option value="Shipped">
                <b>Shipped</b>
              </option>
              <option value="Out For Delivery">
                <b>Out For Delivery</b>
              </option>
              <option value="Delivered">
                <b>Delivered</b>
              </option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
