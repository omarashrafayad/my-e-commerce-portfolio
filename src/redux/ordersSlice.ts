import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Products {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  images: string[];
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  quantity: number;
}

interface ProductItem {
  Orders: Products[];
  loading: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductItem = {
  Orders: [],
  loading: "idle",
  error: null,
};

// ✅ استخدام متغير البيئة بدلاً من الرابط المباشر
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const CreateOrder = createAsyncThunk(
  "Orders/CreateOrder",
  async (
    { token, orderPayload }: { token: string; orderPayload: any },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/orders`,
        orderPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Order creation failed";
      return rejectWithValue(message);
    }
  }
);

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateOrder.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(CreateOrder.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.Orders.push(action.payload); // أو يمكنك استبداله حسب منطقك
      })
      .addCase(CreateOrder.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export default OrderSlice.reducer;
