import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/authslice";
import productsReducer from "@/redux/productslice"
import cartReducer from "@/redux/cartslice"
import wishlistReducer from "@/redux/wishlistslice"
import categoriesReducer from "@/redux/categoriesSlice"
import userReducer from "@/redux/userslice"
import ordersReducer from "@/redux/ordersSlice"
export const store = configureStore({
    reducer:{
        auth:authReducer,
        products:productsReducer,
        cart:cartReducer,
        wishlist:wishlistReducer,
        categories:categoriesReducer,
        user: userReducer,
        orders:ordersReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;