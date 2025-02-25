import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axios from "axios";

interface ShopProductsState {
  isLoading: boolean;
  products: any[];
  error: string | null;
}

interface AuthError {
  message: string;
  code: string;
  response: any;
}

const initialState: ShopProductsState = {
  isLoading: false,
  products: [],
  error: null,
};

// API URL
const API_URL = "http://localhost:3000";

// GET FILTERED PRODUCTS
export const getFilteredProducts = createAsyncThunk(
  "/products/getFilteredProducts",

  async (
    { filterParams, sortParams }: { filterParams: any; sortParams: any },
    { rejectWithValue }
  ) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    try {
      const response = await axios.get(
        `${API_URL}/api/shop/products/get?${query}`
      );
      console.log(response.data, "response from GET FILTERED PRODUCTS");
      return response.data;
    } catch (error) {
      console.error(error, "error from GET FILTERED PRODUCTS");
      return rejectWithValue({
        message: (error as AxiosError).message,
        code: (error as AxiosError).code,
        response: (error as AxiosError).response?.data,
      });
    }
  }
);

const ShopProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFilteredProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getFilteredProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
    });
    builder.addCase(getFilteredProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error =
        (action.payload as AuthError)?.message || "An error occurred";
    });
  },
});

export const {} = ShopProductSlice.actions;
export default ShopProductSlice.reducer;
