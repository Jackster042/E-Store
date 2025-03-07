import { PlusIcon, Trash, Trash2 } from "lucide-react";

import { MinusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { removeFromCart, updateQuantity } from "@/store/shop/cart-slice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "@/hooks/use-toast";
import { CartItem } from "../../types";

const UserCartItemsContainer = ({ items }: { items: CartItem }) => {
  // console.log(item, "item from cart items container");
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.authStore);

  const handleCartItemDelete = (item: CartItem) => {
    console.log(user, "user from cart items container DELETE");
    console.log(item, "item from cart items container DELETE");
    dispatch(removeFromCart({ userId: user?.id, productId: item?.productId }));
  };

  const handleUpdateQuantity = ({
    items,
    typeOfAction,
  }: {
    items: CartItem;
    typeOfAction: "plus" | "minus";
  }) => {
    // console.log(items, "items from cart items container UPDATE QUANTITY");
    // console.log(
    //   typeOfAction,
    //   "type of action from cart items container UPDATE QUANTITY"
    // );
    dispatch(
      updateQuantity({
        userId: user?.id,
        productId: items?.productId,
        quantity:
          typeOfAction === "plus" ? items?.quantity + 1 : items?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success === true) {
        toast({
          title: "Quantity updated successfully",
          description: "Quantity updated successfully",
        });
      } else {
        toast({
          title: "Quantity update failed",
          description: "Quantity update failed",
        });
      }
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={items?.image}
        alt={items?.title}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{items.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full"
            disabled={items?.quantity === 1}
            onClick={() =>
              handleUpdateQuantity({ items, typeOfAction: "minus" })
            }
          >
            <MinusIcon className="w-4 h-4" />
            <span className="sr-only">minus</span>
          </Button>
          <span>{items.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full"
            // disabled={items?.quantity === 1}
            onClick={() =>
              handleUpdateQuantity({ items, typeOfAction: "plus" })
            }
          >
            <PlusIcon className="w-4 h-4" />
            <span className="sr-only">plus</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (items?.salePrice > 0 ? items.salePrice : items.price) *
            items.quantity
          )
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(items)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
};

export default UserCartItemsContainer;
