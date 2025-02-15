import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";

// ROOT STATE TYPE
export interface RootState {
  authStore: ReturnType<typeof authSlice>;
}

const store = configureStore({
  reducer: { authStore: authSlice },
});

// DISPATCH TYPE
export type AppDispatch = typeof store.dispatch;

export default store;
