import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContainer from "./cart-items-container";

// Updated interface to match the structure from MongoDB
interface CartItem {
  productId: {
    _id: string;
    image: string;
    title: string;
    price: number;
  };
  quantity: number;
  _id: string;
}

const UserCartWrapper = ({ items }: { items: CartItem[] }) => {
  console.log(items, "items from cart wrapper");
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {/* RENDER ITEMS */}
        {items && items.length > 0
          ? items.map((item) => (
              <UserCartItemsContainer key={item._id} item={item} />
            ))
          : "No items in cart"}
      </div>
      <div className="mt-8 space-y-4">
        {/* RENDER TOTAL */}
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">$1000</span>
        </div>
        <Button className="w-full mt-6">Checkout</Button>
      </div>
    </SheetContent>
  );
};

export default UserCartWrapper;
