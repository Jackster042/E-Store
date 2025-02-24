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
}

interface ShoppingProductTileProps {
  product: Product;
}

const ShoppingProductTile = ({ product }: ShoppingProductTileProps) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 right-2">Sale</Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-lg font-bold mb-2 truncate">{product?.title}</h2>
          {/* CATEGORY AND BRAND */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground text-sm capitalize">
              {product?.category}
            </span>
            <span className="text-muted-foreground text-sm capitalize">
              {product?.brand}
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
              {product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-muted-foreground text-sm">
                {product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
        {/* ADD TO CART BUTTON */}
        <CardFooter>
          <Button className="w-full">Add to Cart</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ShoppingProductTile;
