import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";

interface Address {
  address: string;
  city: string;
  pincode: string;
  phone: string;
  notes: string;
}
const AddressCard = ({ addressInfo }: { addressInfo: Address }) => {
  return (
    <Card>
      <CardContent className="grid gap-4">
        <Label>{addressInfo.address}</Label>
        <Label>{addressInfo.city}</Label>
        <Label>{addressInfo.pincode}</Label>
        <Label>{addressInfo.phone}</Label>
        <Label>{addressInfo.notes}</Label>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
