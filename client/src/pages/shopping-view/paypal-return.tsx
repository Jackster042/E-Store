// REACT
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// REDUX
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { capturePayment } from "@/store/order-slice";

// COMPONENTS
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

// UTILS

const PayPalReturn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(
        sessionStorage.getItem("currentOrderId") || ""
      );

      dispatch(capturePayment({ orderId, paymentId, payerId })).then((data) => {
        console.log(data, "data from capturePayment");
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shop/paypal-success";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment ... Please Wait</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PayPalReturn;
