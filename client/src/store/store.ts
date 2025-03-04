import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import adminProductSlice from "./admin/product-slice";
import shopProductSlice from "./shop/product-slice";
import shopCartSlice from "./shop/cart-slice";
import addressSlice from "./shop/address-slice";
// ROOT STATE TYPE
export interface RootState {
  authStore: ReturnType<typeof authSlice>;
  adminProductStore: ReturnType<typeof adminProductSlice>;
  shopProductStore: ReturnType<typeof shopProductSlice>;
  shoppingCartStore: ReturnType<typeof shopCartSlice>;
  addressStore: ReturnType<typeof addressSlice>;
}

// console.log(authSlice, "authSlice");

const store = configureStore({
  reducer: {
    authStore: authSlice,
    adminProductStore: adminProductSlice,
    shopProductStore: shopProductSlice,
    shoppingCartStore: shopCartSlice,
    addressStore: addressSlice,
  },
});

// DISPATCH TYPE
export type AppDispatch = typeof store.dispatch;

export default store;
