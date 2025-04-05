// REACT
import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// UTILS
import { toast } from "@/hooks/use-toast";

// COMPONENTS
import { Input } from "@/components/ui/input";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

// REDUX
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import { getProductDetails } from "@/store/shop/product-slice";
import { addToCart, getCart } from "@/store/shop/cart-slice";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state: RootState) => state.authStore);
  const { cartItems } = useSelector(
    (state: RootState) => state.shoppingCartStore
  );
  const { products, productDetails } = useSelector(
    (state: RootState) => state.shopProductStore
  );
  const { searchResults } = useSelector(
    (state: RootState) => state.searchStore
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleGetProductDetails = (getCurrentProductId: string) => {
    dispatch(getProductDetails(getCurrentProductId));
  };

  const handleAddToCart = (id: string, totalStock: number) => {
    if (!user || !user.id) {
      console.error("User not logged in or user ID is missing");
      alert("Please log in to add items to cart");
      return;
    }

    const getCartItems = cartItems?.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item: any) => item.productId === id
      );

      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > totalStock) {
          toast({
            title: `Only ${totalStock} can be added to cart`,
            variant: "destructive",
          });
          return;
        }
      }
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

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 2) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <Fragment>
      <div className="container mx-auto min-h-[calc(100vh-10rem)] py-8 px-4 md:px-6">
        <div className="flex justify-center mb-8">
          <div className="flex items-center w-full lg:w-3/4">
            <Input
              name="keyword"
              placeholder="Search for products"
              className="py-6"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                console.log(e.target.value);
              }}
            />
          </div>
        </div>
        {!searchResults.length ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl font-extrabold">No result found!</h1>
          </div>
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((item) => (
            <ShoppingProductTile
              product={item}
              handleGetProductDetails={handleGetProductDetails}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      </div>
    </Fragment>
  );
};

export default SearchProducts;
