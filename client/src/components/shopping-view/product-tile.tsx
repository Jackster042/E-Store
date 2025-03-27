// CONFIG
import { brandOptionsMap } from "@/config";
import { categoryOptionsMap } from "@/config";

// COMPONENTS
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

interface Product {
  _id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  salePrice: number;
  category: string;
  brand: string;
  totalStock: number;
}

interface ShoppingProductTileProps {
  product: Product;
  handleGetProductDetails: (id: string) => void;
  handleAddToCart: (id: string, totalStock: number) => void;
}

const ShoppingProductTile = ({
  product,
  handleGetProductDetails,
  handleAddToCart,
}: ShoppingProductTileProps) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white">
              Out of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white">
              Only {product?.totalStock} left
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 right-2 bg-red-500 text-white">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-lg font-bold mb-2 truncate">{product?.title}</h2>
          {/* CATEGORY AND BRAND */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground text-sm ">
              {
                categoryOptionsMap[
                  product?.category as keyof typeof categoryOptionsMap
                ]
              }
            </span>
            <span className="text-muted-foreground text-sm ">
              {brandOptionsMap[product?.brand as keyof typeof brandOptionsMap]}
            </span>
          </div>
          {/* PRICE AND SALE PRICE */}
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0
                  ? "line-through"
                  : "text-lg font-semibold"
              }`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-muted-foreground text-sm">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
        {/* ADD TO CART BUTTON */}
      </div>
      <CardFooter>
        {product?.totalStock === 0 ? (
          <Button className="w-full" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddToCart(product?._id, product?.totalStock)}
            className="w-full"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
