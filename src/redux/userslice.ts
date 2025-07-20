import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL; // 👈 استخدم متغير البيئة هنا

interface UserState {
  data: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: UserState = {
  data: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },
  loading: false,
  error: null,
  successMessage: null,
};

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${BASE_URL}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "فشل تحميل البيانات";
      return rejectWithValue(message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (
    { userId, formData }: { userId: string; formData: any },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.patch(
        `${BASE_URL}/api/users/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.data.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "حدث خطأ أثناء التحديث";
      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "فشل جلب البيانات";
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "✅ تم حفظ البيانات بنجاح";
        state.data = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "❌ حدث خطأ أثناء التحديث";
      });
  },
});

export const { clearStatus } = userSlice.actions;
export default userSlice.reducer;
