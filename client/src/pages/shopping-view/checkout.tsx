import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

import imgAccount from "../../assets/account.jpg";

import { Button } from "@/components/ui/button";
import Address from "@/components/shopping-view/address";
import UserCartItemsContainer from "@/components/shopping-view/cart-items-container";

import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "@/store/order-slice";

const ShoppingCheckout = () => {
  const [currentSelectedAddress, setCurrentSelectedAddress] =
    useState<any>(null);
  const [isPaymentStarted, setIsPaymentStarted] = useState<boolean>(false);

  const { approvalURL } = useSelector((state: any) => state.orderStore);
  const { items } = useSelector((state: any) => state.shoppingCartStore);
  const { user } = useSelector((state: any) => state.authStore);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // console.log(items, "items from checkout");
  // console.log(user, "user from checkout");
  console.log(currentSelectedAddress, "currentSelectedAddress from checkout");

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

  const handleInitiatePaypalPayment = () => {
    const orderData = {
      userId: user.id,
      cartId: items._id,
      cartItems: items.items.map((item: any) => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price: item.salePrice > 0 ? item.salePrice : item.price,
        quantity: item.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress._id,
        address: currentSelectedAddress.address,
        city: currentSelectedAddress.city,
        pincode: currentSelectedAddress.pincode,
        phone: currentSelectedAddress.phone,
        notes: currentSelectedAddress.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    // console.log(orderData, "orderData from checkout");

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "data from createNewOrder");
      if (data?.payload?.success) {
        setIsPaymentStarted(true);
        // window.location.href = data?.payload?.approvalURL;
      } else {
        setIsPaymentStarted(false);
        toast({
          title: "Error",
          description: data?.payload?.message,
        });
      }
    });
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

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
          <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
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
                onClick={handleInitiatePaypalPayment}
                disabled={!currentSelectedAddress}
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
