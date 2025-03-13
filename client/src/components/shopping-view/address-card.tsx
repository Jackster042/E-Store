import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface Address {
  address: string;
  city: string;
  pincode: string;
  phone: string;
  notes: string;
  _id: string;
}
const AddressCard = ({
  addressInfo,
  handleDelete,
  handleEdit,
  selectedId,
  setCurrentSelectedAddress,
}: {
  addressInfo: Address;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  selectedId: string;
  setCurrentSelectedAddress: (address: Address) => void;
}) => {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : undefined
      }
      className={`cursor-pointer ${
        selectedId === addressInfo._id ? "border-red-900 border-[2px]" : ""
      }`}
    >
      <CardContent className="grid gap-4 p-4">
        <Label>Address: {addressInfo.address}</Label>
        <Label>City: {addressInfo.city}</Label>
        <Label>pincode: {addressInfo.pincode}</Label>
        <Label>Phone: {addressInfo.phone}</Label>
        <Label>Notes: {addressInfo.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 p-3">
        <Button variant="outline" onClick={() => handleEdit(addressInfo._id)}>
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => handleDelete(addressInfo._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
