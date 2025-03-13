import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { getCart } from "@/store/shop/cart-slice";
import { addToCart } from "@/store/shop/cart-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { toast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/product-slice";

interface ProductDetailsDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  productDetails: any;
}

const ProductDetailsDialog = ({
  open,
  setOpen,
  productDetails,
}: ProductDetailsDialogProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.authStore);

  const handleAddToCart = (id: string) => {
    // console.log(id, "id from HANDLE ADD TO CART");
    // console.log(user, "user in handleAddToCart");

    if (!user || !user.id) {
      console.error("User not logged in or user ID is missing");
      alert("Please log in to add items to cart");
      return;
    }

    dispatch(addToCart({ userId: user.id, productId: id, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(getCart(user.id));
          toast({
            title: "Item added to cart",
            description: "You can view your cart in the cart page",
          });
        } else {
          toast({
            title: "Item not added to cart",
            description: "Please try again",
          });
        }
      }
    );
  };

  const handleCloseDialog = () => {
    dispatch(setProductDetails());
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogTitle>Product Details</DialogTitle>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square object-cover w-full"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-bold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-3xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <StarIcon className="w-4 h-4 fill-primary" />
              <StarIcon className="w-4 h-4 fill-primary" />
              <StarIcon className="w-4 h-4 fill-primary" />
              <StarIcon className="w-4 h-4 fill-primary" />
              <StarIcon className="w-4 h-4 fill-primary" />
            </div>
            <span className="text-muted-foreground">(4.5)</span>
          </div>
          <div className="mb-5 mt-5">
            <Button
              className="w-full mt-5"
              onClick={() => handleAddToCart(productDetails?._id)}
            >
              Add to Cart
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>NS</AvatarFallback>
                </Avatar>
                <div className="grid ga-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Nevena Nevenic</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                    <StarIcon className="w-4 h-4 fill-primary" />
                  </div>
                  <p className="text-muted-foreground">Product is great!</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Input type="text" placeholder="Add a review" />
                <Button className="w-1/2">Add</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
