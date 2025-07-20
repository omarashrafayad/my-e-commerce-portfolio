import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Category {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

interface categoryItem {
    name: Category[];
}

export const GetAllCategories = createAsyncThunk(
    "Categories/GetAllCategories",
    async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
            return res.data.data;
        } catch (error: any) {
            if (error.response) {
                throw new Error("not found");
            } else {
                throw new Error("not server");
            }
        }
    }
);

export const createCategories = createAsyncThunk(
    "Categories/createCategories",
    async (
        { token, name, description }: { token: string; name: string; description: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
                { name, description },
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
                error.response?.data?.message || "category creation failed";
            return rejectWithValue(message);
        }
    }
);

export const updateCategories = createAsyncThunk(
    "categories/updateCategories",
    async (
        {
            token,
            id,
            name,
            description
        }: {
            token: string;
            id: string;
            name: string;
            description: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`,
                { name, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            return res.data.data;
        } catch (error: any) {
            const message =
                error.response?.data?.message || "update category failed";
            return rejectWithValue(message);
        }
    }
);

const initialState: categoryItem = {
    name: []
};

const CategoriesSlice = createSlice({
    name: "Categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.name = action.payload;
            })
            .addCase(createCategories.fulfilled, (state, action: PayloadAction<Category>) => {
                state.name.push(action.payload);
            })
            .addCase(updateCategories.fulfilled, (state, action: PayloadAction<Category>) => {
                const exist = state.name.find((f) => f._id === action.payload._id);
                if (exist) {
                    exist.name = action.payload.name;
                    exist.description = action.payload.description;
                }
            });
    }
});

export default CategoriesSlice.reducer;
