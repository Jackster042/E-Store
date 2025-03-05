import { FormEvent, useEffect, useState } from "react";
import { RootState, AppDispatch } from "@/store/store";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useSelector, useDispatch } from "react-redux";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAllData,
} from "@/store/shop/address-slice";
import { toast } from "@/hooks/use-toast";
import AddressCard from "./address-card";

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
  const [formData, setFormData] = useState<FormData>(initialFormdata);
  const [currentEditedId, setCurrentEditedId] = useState<string | null>(null);

  const { user } = useSelector((state: RootState) => state.authStore);
  const { addressList } = useSelector((state: RootState) => state.addressStore);
  // console.log(user, "user in address");
  const dispatch = useDispatch<AppDispatch>();

  const handleManageAddress = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialFormdata);
      toast({
        title: "You can only have 3 addresses",
        description: "You can only have 3 addresses",
        variant: "destructive",
      });
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?._id,
            addressId: currentEditedId,
            formData: formData,
          })
        ).then((data) => {
          console.log(data);
          dispatch(fetchAllData(user?._id));
          setFormData(initialFormdata);
          setCurrentEditedId(null);
          toast({
            title: "Address updated successfully",
            description: "Address updated successfully",
          });
        })
      : dispatch(
          addAddress({
            ...formData,
            userId: user?._id,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success === true) {
            dispatch(fetchAllData(user?._id));
            setFormData(initialFormdata);
            toast({
              title: "Address added successfully",
              description: "Address added successfully",
            });
          } else {
            toast({
              title: "Address not added",
              description: "Address not added",
            });
          }
        });
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

  const handleEdit = (id: string) => {
    console.log(id, "id in handleEdit");
    setCurrentEditedId(id);
    setFormData(addressList.find((item) => item._id === id));
  };

  const handleDelete = (id: string) => {
    console.log(id, "id in handleDelete");
    dispatch(
      deleteAddress({
        userId: user?._id,
        addressId: id,
      })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success === true) {
        dispatch(fetchAllData(user?._id));
        toast({
          title: "Address deleted successfully",
          description: "Address deleted successfully",
        });
      } else {
        toast({
          title: "Address not deleted",
          description: "Address not deleted",
        });
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllData(user?._id));
  }, [dispatch, user?._id]);

  console.log(addressList, "addressList in address");

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem._id}
                addressInfo={singleAddressItem}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                // setCurrentEditedId={setCurrentEditedId}
                // setFormData={setFormData}
              />
            ))
          : "No address found"}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls as FormControl[]}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
          buttonText={currentEditedId !== null ? "Edit Address" : "Add Address"}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
