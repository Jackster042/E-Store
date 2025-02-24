// LIBRARIES
import { ArrowUpDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

// COMPONENTS
import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// CONFIG
import { sortOptions } from "@/config";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useEffect } from "react";
import { getAllProducts } from "@/store/admin/product-slice";

interface Product {
  _id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  salePrice: number;
}

const ShoppingListing = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector(
    (state: RootState) => state.adminProductStore
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
      <div className="bg-background rounded-lg shadow-sm w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-extrabold">All Products</h2>
          {/* DROPDOWN MENU AND SORT BY DROPDOWN AND NUMBER OF PRODUCTS */}
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">All Products</span>
            {/* SORT BY DROPDOWN */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              {/* CONTENT */}
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {products.map((product: Product) => (
            <ShoppingProductTile product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
