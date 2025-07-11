// ICONS
import { Mail, Phone } from "lucide-react";

// REACT
import { useNavigate } from "react-router-dom";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PayPalSuccess = () => {
  const navigate = useNavigate();
  return (
    <>
      <Card className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-10rem)] gap-10 mt-10">
        <CardHeader className="p-0">
          <CardTitle className="text-5xl font-bold">
            Payment Successful
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-sm text-muted-foreground">
            Thank you for your purchase. Your order has been placed
            successfully.
          </p>
        </CardContent>
        <Button
          onClick={() => navigate("/shop/account")}
          className="bg-yellow-400 text-black hover:bg-yellow-500 hover:text-white w-1/4 sm:w-1/6"
        >
          View Orders
        </Button>
        <Separator className="w-3/4" />
        <div className="flex flex-col items-center justify-center w-full mt-12 gap-2">
          <p className="text-sm text-muted-foreground mb-4">
            We appreciate your business! Feel free to continue browsing our
            collection.
          </p>
          <Button
            onClick={() => navigate("/shop/home")}
            className="w-1/4 sm:w-1/6 mb-10"
          >
            Continue Shopping
          </Button>

          <Separator className="w-3/4 my-4" />

          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-3">Need help with your order?</p>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:support@yourstore.com"
                  className="underline hover:text-primary"
                >
                  support@yourstore.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <p className="text-xs mt-2">Mon-Fri: 9AM-5PM EST</p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default PayPalSuccess;
