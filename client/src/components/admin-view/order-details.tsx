import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";
import { useState, FormEvent } from "react";

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

const handleUpdateStatus = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const AdminOrderDetailsView = () => {
  const [formData, setFormData] = useState(initialFormData);

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6 p-2">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>INV001</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>12/04/2024</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>Paid</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>$250.00</Label>
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
              <span>Address: John Doe</span>
              <span>Address: 123 Main St, Anytown, USA</span>
              <span>City: Anytown, USA</span>
              <span>Pincode: 1234567890</span>
              <span>Phone: 1234567890</span>
              <span>Notes: This is a note</span>
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
