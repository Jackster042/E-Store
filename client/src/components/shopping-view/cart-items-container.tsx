import { PlusIcon, Trash, Trash2 } from "lucide-react";

import { MinusIcon } from "lucide-react";
import { Button } from "../ui/button";

interface CartItem {
  productId: {
    _id: string;
    image: string;
    title: string;
    price: number;
    salePrice: number;
  };
  quantity: number;
  _id: string;
}

const UserCartItemsContainer = ({ item }: { item: CartItem }) => {
  console.log(item, "item from cart items container");
  return (
    <div className="flex items-center space-x-4">
      <img
        src={item?.image}
        alt={item?.title}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{item.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full"
          >
            <MinusIcon className="w-4 h-4" />
            <span className="sr-only">minus</span>
          </Button>
          <span>{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="sr-only">plus</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {((item?.salePrice > 0 ? item.salePrice : item.price) * item.quantity)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <Trash className="cursor-pointer mt-1" size={20} />
      </div>
    </div>
  );
};

export default UserCartItemsContainer;
