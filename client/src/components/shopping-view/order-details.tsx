import { Label } from "@radix-ui/react-label";
import { Separator } from "@/components/ui/separator";
import { DialogContent } from "@/components/ui/dialog";

const ShoppingOrderDetailsView = ({ orderDetails }: { orderDetails: any }) => {
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
            <Label>{orderDetails?.orderDate}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>{orderDetails?.orderStatus}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>{orderDetails?.totalAmount}</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product One</span>
                <span>$150</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Details</div>
            <div className="grid gap-0.5 text-sm text-muted-foreground">
              <span>Address: {orderDetails?.shippingAddress?.address}</span>
              <span>Address: {orderDetails?.shippingAddress?.city}</span>
              <span>City: {orderDetails?.shippingAddress?.state}</span>
              <span>Pincode: {orderDetails?.shippingAddress?.zipCode}</span>
              <span>Phone: {orderDetails?.shippingAddress?.phone}</span>
              <span>Notes: {orderDetails?.shippingAddress?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetailsView;
