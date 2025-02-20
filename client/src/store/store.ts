import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import adminProductSlice from "./admin/product-slice";
// ROOT STATE TYPE
export interface RootState {
  authStore: ReturnType<typeof authSlice>;
  adminProductStore: ReturnType<typeof adminProductSlice>;
}

// console.log(authSlice, "authSlice");

const store = configureStore({
  reducer: { authStore: authSlice, adminProductStore: adminProductSlice },
});

// DISPATCH TYPE
export type AppDispatch = typeof store.dispatch;

export default store;
