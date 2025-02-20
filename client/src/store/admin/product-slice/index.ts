import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// ADMIN PRODUCTS STATE
interface AdminProductsState {
  isLoading: boolean;
  products: any[];
  error: string | null;
}

// AUTH ERROR
interface AuthError {
  message: string;
  code: string;
  response: any;
}

// INITIAL STATE
const initialState: AdminProductsState = {
  isLoading: false,
  products: [],
  error: null,
};

// API URL
const API_URL = "http://localhost:3000";

// ADD NEW PRODUCT
export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",

  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/products/addProduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(response.data, "response from GET ALL PRODUCTS");
      return response.data;
    } catch (error) {
      console.error(error, "error from GET ALL PRODUCTS");
      return rejectWithValue({
        message: (error as AxiosError).message,
        code: (error as AxiosError).code,
        response: (error as AxiosError).response?.data,
      });
    }
  }
);

// GET ALL PRODUCTS
export const getAllProducts = createAsyncThunk(
  "/products/getAllProducts",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/admin/products/getAllProducts`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data, "response from GET ALL PRODUCTS");
      return response.data;
    } catch (error) {
      console.error(error, "error from GET ALL PRODUCTS");
      return rejectWithValue({
        message: (error as AxiosError).message,
        code: (error as AxiosError).code,
        response: (error as AxiosError).response?.data,
      });
    }
  }
);

// EDIT PRODUCT
export const editProduct = createAsyncThunk(
  "/products/editProduct",

  async (
    { formData, id }: { formData: FormData; id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/products/editProduct/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(response.data, "response from EDIT PRODUCT");
      return response.data;
    } catch (error) {
      console.error(error, "error from EDIT PRODUCT");
      return rejectWithValue({
        message: (error as AxiosError).message,
        code: (error as AxiosError).code,
        response: (error as AxiosError).response?.data,
      });
    }
  }
);

// DELETE PRODUCT
export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",

  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/admin/products/deleteProduct/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data, "response from DELETE PRODUCT");
      return response.data;
    } catch (error) {
      console.error(error, "error from DELETE PRODUCT");
      return rejectWithValue({
        message: (error as AxiosError).message,
        code: (error as AxiosError).code,
        response: (error as AxiosError).response?.data,
      });
    }
  }
);

const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      console.log(action.payload, "action.payload from GET ALL PRODUCTS");

      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error =
        (action.payload as AuthError)?.message || "An error occurred";
    });
  },
});

export const {} = AdminProductSlice.actions;
export default AdminProductSlice.reducer;
