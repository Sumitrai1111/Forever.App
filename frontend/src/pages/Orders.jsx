import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "../components/Title.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        // console.log(allOrdersItem);
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div className="">
        {/* we use orderData after products.slice remove */}
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py04 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm mt-2">
              <img src={item.image[0]} className="w-16 sm:w-20" />
              <div>
                <p className="sm:text-base font-medium">
                  <b>{item.name}</b>
                </p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  <p>
                    <b>
                      {currency}
                      {item.price}
                    </b>
                  </p>
                  <p>
                    <b>Quantity: {item.quantity}</b>
                  </p>
                  <p>
                    <b>Size: {item.size}</b>
                  </p>
                </div>
                <p className="mt-1">
                  <b> Date:</b>
                  <span className="text-gray-700  px-1">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1 mb-2">
                  <b>Payment:</b>
                  <span className="text-gray-700 px-1">
                    {item.paymentMethod}
                  </span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">
                  <b>{item.status}</b>
                </p>
              </div>
              <button
                onClick={loadOrderData}
                className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer active:bg-gray-200"
              >
                <b>Track Order</b>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
