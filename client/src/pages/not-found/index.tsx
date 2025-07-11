import { useNavigate } from "react-router-dom";

// ICONS
import { AlertCircle, ArrowLeft } from "lucide-react";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-10rem)] gap-8 mt-10">
      {/* ERROR HEADER */}
      <CardHeader className="p-0 flex flex-col items-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <CardTitle className="text-4xl font-bold text-red-500">
          Payment Failed
        </CardTitle>
      </CardHeader>

      {/* ERROR CONTENT */}
      <CardContent className="p-0 text-center max-w-md">
        <p className="text-muted-foreground mb-4">
          We couldn't process your payment. Please check your payment details
          and try again.
        </p>

        <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-sm text-red-800 my-6">
          <p>Possible reasons:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Insufficient funds</li>
            <li>Incorrect card details</li>
            <li>Bank declined the transaction</li>
            <li>Network issues</li>
          </ul>
        </div>
      </CardContent>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col items-center gap-4 w-full">
        <Button
          onClick={() => navigate(-1)} // Go back to payment page
          className="w-1/3 bg-red-500 hover:bg-red-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Try Payment Again
        </Button>

        <Separator className="w-1/3 my-2" />

        <Button
          onClick={() => navigate("/shop/home")}
          variant="outline"
          className="w-1/3"
        >
          Continue Shopping
        </Button>
      </div>

      {/* SUPPORT INFO */}
      <div className="text-center text-xs text-muted-foreground mt-8">
        <p>Still having trouble? Contact our support:</p>
        <p className="mt-1">
          <a href="mailto:support@yourstore.com" className="underline">
            support@yourstore.com
          </a>
          {" | "}
          <a href="tel:+15551234567" className="underline">
            +1 (555) 123-4567
          </a>
        </p>
      </div>
    </Card>
  );
};

export default NotFound;
