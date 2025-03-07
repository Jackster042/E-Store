import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

import imgAccount from "../../assets/account.jpg";

import { Button } from "@/components/ui/button";
import Address from "@/components/shopping-view/address";
import UserCartItemsContainer from "@/components/shopping-view/cart-items-container";

import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

const ShoppingCheckout = () => {
  const { user } = useSelector((state: any) => state.authStore);
  const { items } = useSelector((state: any) => state.shoppingCartStore);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  console.log(items.items, "items from checkout");

  const totalCartAmount =
    items && items.items && items.items.length > 0
      ? items.items.reduce(
          (acc: number, item: any) =>
            acc +
            (item?.salePrice && item?.salePrice > 0
              ? item?.salePrice
              : item?.price) *
              item?.quantity,
          0
        )
      : null;

  return (
    <Fragment>
      <div className="flex flex-col">
        {/* CHECKOUT HEADER */}
        <div className="relative w-full h-[300px] object-cover overflow-hidden">
          <img
            src={imgAccount}
            alt="account"
            className="w-full h-full object-cover"
          />
        </div>
        {/* CHECKOUT BODY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5 p-5">
          {/* ADDRESS */}
          <Address />
          {/* CART ITEMS */}
          <div className="flex flex-col gap-4">
            {items && items.items && items.items.length > 0 ? (
              items.items.map((item: any) => (
                <UserCartItemsContainer key={item._id} items={item} />
              ))
            ) : (
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">No items in cart</h1>
                <p className="text-gray-500">
                  Add items to your cart to continue
                </p>
              </div>
            )}
            {/* ORDER SUMMARY */}
            <div className="mt-8 space-y-4">
              {/* RENDER TOTAL */}
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">
                  ${(totalCartAmount || 0).toFixed(2)}
                </span>
              </div>
              <Button
                className="w-full mt-6"
                onClick={() => {
                  navigate("/shop/home");
                }}
              >
                Continue to PayPal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShoppingCheckout;
