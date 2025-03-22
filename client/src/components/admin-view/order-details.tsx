// REACT
import { useState, FormEvent } from "react";

// COMPONENTS
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  updateOrderStatus,
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
} from "@/store/admin/order-slice";

// HOOKS
import { toast } from "@/hooks/use-toast";

interface FormControl {
  label: string;
  name: string;
  componentType: "input" | "textarea" | "select" | "checkbox" | "radio";
  type: string;
  placeholder: string;
  options?: { id: string; label: string }[];
}

const formControls: FormControl[] = [
  {
    label: "Order Status",
    name: "status",
    componentType: "select",
    options: [
      { id: "pending", label: "Pending" },
      { id: "inProcess", label: "Processing" },
      { id: "inShipping", label: "In Shipping" },
      { id: "delivered", label: "Delivered" },
      { id: "cancelled", label: "Cancelled" },
    ],
    type: "text",
    placeholder: "Select Order Status",
  },
];

const initialFormData = {
  status: "",
};

const AdminOrderDetailsView = ({ orderDetails }: { orderDetails: any }) => {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state: RootState) => state.authStore);

  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateStatus = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData, "formData");
    dispatch(
      updateOrderStatus({
        id: orderDetails?._id,
        orderStatus: formData.status,
      })
    ).then((data) => {
      console.log(data, "data from updateOrderStatus");
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: "Order Status Updated Successfully",
          description: "The order status has been updated successfully",
        });
      }
    });
  };
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

        <CommonForm
          formControls={formControls}
          isBtnDisabled={false}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleUpdateStatus}
          buttonText="Update Order Status"
        />
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
