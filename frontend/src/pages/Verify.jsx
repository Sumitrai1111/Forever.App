import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div style={{ minHeight: "60vh", display: "grid" }}>
      <style>
        {`
      @keyframes rotate {
        100% {
          transform: rotate(360deg);
        }
      }
    `}
      </style>

      <div
        style={{
          width: "100px",
          height: "100px",
          placeSelf: "center",
          border: "5px solid #bdbdbd",
          borderTopColor: "tomato",
          borderRadius: "50%",
          animation: "rotate 1s linear infinite",
        }}
      ></div>
    </div>
  );
};

export default Verify;
