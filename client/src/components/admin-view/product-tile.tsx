// COMPONENTS
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

interface AdminProductTileProps {
  product: Product;
  formData: any;
  setFormData: (formData: any) => void;
  setCurrentEditedId: (id: string) => void;
  setOpenAddProduct: (open: boolean) => void;
  handleDelete: (id: string) => void;
}

const AdminProductTile = ({
  product,
  formData,
  setFormData,
  setCurrentEditedId,
  setOpenAddProduct,
  handleDelete,
}: AdminProductTileProps) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        {/* IMAGE */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>

        <CardContent>
          <h2 className="text-xl mb-2 font-bold truncate">{product.title}</h2>
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-lg font-semibold ${
                product.salePrice ? "line-through" : ""
              }`}
            >
              ${product.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        {/* BUTTONS */}
        <CardFooter className="flex items-center justify-between">
          <Button
            onClick={() => {
              setOpenAddProduct(true);
              setCurrentEditedId(product._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminProductTile;
