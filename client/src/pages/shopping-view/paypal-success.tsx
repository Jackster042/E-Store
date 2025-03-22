// REACT
import { useNavigate } from "react-router-dom";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PayPalSuccess = () => {
  const navigate = useNavigate();
  return (
    <Card className="mt-10">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl font-bold">Payment Successful</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-sm text-muted-foreground">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
      </CardContent>
      <Button onClick={() => navigate("/shop/account")}>View Orders</Button>
    </Card>
  );
};

export default PayPalSuccess;
