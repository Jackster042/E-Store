import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import adminProductSlice from "./admin/product-slice";
import shopProductSlice from "./shop/product-slice";
import shopCartSlice from "./shop/cart-slice";
import addressSlice from "./shop/address-slice";
import orderSlice from "./order-slice";
import adminOrderSlice from "./admin/order-slice";
import searchSlice from "./shop/search-slice";
import reviewSlice from "./shop/review-slice";
import commonSlice from "./shop/common-slice";

// ROOT STATE TYPE
export interface RootState {
  authStore: ReturnType<typeof authSlice>;
  adminProductStore: ReturnType<typeof adminProductSlice>;
  adminOrderStore: ReturnType<typeof adminOrderSlice>;
  shopProductStore: ReturnType<typeof shopProductSlice>;
  shoppingCartStore: ReturnType<typeof shopCartSlice>;
  addressStore: ReturnType<typeof addressSlice>;
  orderStore: ReturnType<typeof orderSlice>;
  searchStore: ReturnType<typeof searchSlice>;
  reviewStore: ReturnType<typeof reviewSlice>;
  commonStore: ReturnType<typeof commonSlice>;
}

// console.log(authSlice, "authSlice");

const store = configureStore({
  reducer: {
    authStore: authSlice,
    adminProductStore: adminProductSlice,
    shopProductStore: shopProductSlice,
    shoppingCartStore: shopCartSlice,
    searchStore: searchSlice,
    addressStore: addressSlice,
    orderStore: orderSlice,
    adminOrderStore: adminOrderSlice,
    reviewStore: reviewSlice,
    commonStore: commonSlice,
  },
});

// DISPATCH TYPE
export type AppDispatch = typeof store.dispatch;

export default store;
