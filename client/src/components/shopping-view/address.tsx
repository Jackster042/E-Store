import { FormEvent, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import CommonForm from "../common/form";
import { addressFormControls } from "@/config";

interface FormControl {
  label: string;
  name: string;
  componentType: "input" | "textarea" | "select" | "checkbox" | "radio";
  type: string;
  placeholder: string;
}
interface FormData {
  address: string | null;
  city: string | null;
  pincode: string | null;
  phone: string | null;
  notes: string | null;
}

const initialFormdata: FormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};
const Address = () => {
  const [formData, setFormDate] = useState<FormData>(initialFormdata);

  const handleManageAddress = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  function isFormValid() {
    console.log("Form Data:", formData);
    const isValid = Object.keys(formData).every((key) => {
      const value = formData[key as keyof FormData];
      console.log(`Field ${key}:`, value);
      return value !== null && value !== "";
    });
    console.log("Is Valid:", isValid);
    return isValid;
  }

  return (
    <Card>
      <div>Address</div>
      <CardHeader>
        <CardTitle>Add new address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls as FormControl[]}
          formData={formData}
          setFormData={setFormDate}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
          buttonText="Add Address"
        />
      </CardContent>
    </Card>
  );
};

export default Address;
