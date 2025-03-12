import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface AuthError {
  message: string;
  code: string;
  response: any;
}

interface OrderState {
  approvalURL: string | null;
  orderId: any[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  approvalURL: null,
  orderId: null,
  loading: false,
  error: null,
};

// API URL
const API_URL = "http://localhost:3000";

// CREATE NEW ORDER
export const createNewOrder = createAsyncThunk(
  "order/createNewOrder",
  async (orderData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/shop/order/create`,
        orderData
      );
      console.log(
        response.data,
        "response.data from CREATE NEW ORDER - FRONTEND"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: (error as AxiosError).message,
        code: (error as AxiosError).code,
        response: (error as AxiosError).response?.data,
      });
    }
  }
);

const orderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createNewOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.approvalURL = action.payload.approvalURL;
      state.orderId = action.payload.orderId;
    });
    builder.addCase(createNewOrder.rejected, (state, action) => {
      state.loading = false;
      state.approvalURL = null;
      state.orderId = null;
      state.error =
        (action.payload as AuthError)?.message || "An error occurred";
    });
  },
});

export const {} = orderSlice.actions;
export default orderSlice.reducer;
