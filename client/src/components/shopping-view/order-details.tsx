// REACT
import { Label } from "@radix-ui/react-label";

// COMPONENTS
import { Separator } from "@/components/ui/separator";
import { DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// REDUX
import { useSelector } from "react-redux";

const ShoppingOrderDetailsView = ({ orderDetails }: { orderDetails: any }) => {
  const { user } = useSelector((state: any) => state.authStore);

  console.log(user, "user");
  console.log(orderDetails, "orderDetails");
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6 p-2">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Badge
              className={`py-1 px-3 ${
                orderDetails?.orderStatus === "completed"
                  ? "bg-green-500"
                  : orderDetails?.orderStatus === "cancelled"
                  ? "bg-red-600"
                  : "bg-black"
              }`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? (
                orderDetails?.cartItems.map((item: any) => (
                  <li className="flex items-center justify-between">
                    <span>Title: {item?.title}</span>
                    <span>Quantity: {item?.quantity}</span>
                    <span>Price: ${item?.price}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-center justify-between">
                  <span>No items in the order</span>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Details</div>
            <div className="grid gap-0.5 text-sm text-muted-foreground">
              <span>User: {user?.userName}</span>
              <span>Address: {orderDetails?.addressInfo?.address}</span>
              <span>City: {orderDetails?.addressInfo?.city}</span>
              <span>Pincode: {orderDetails?.addressInfo?.pincode}</span>
              <span>Phone: {orderDetails?.addressInfo?.phone}</span>
              <span>Notes: {orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetailsView;
