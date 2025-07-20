import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "@/lib/types";
interface WishlistItem {
    Favourite: Products[]
    message:string
}

const initialState: WishlistItem = {
    Favourite:[],
    message:''
};
const wishlistslice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        ToggleToWishlist:(state,action :PayloadAction<Products> )=>{
            const exists = state.Favourite.find(item => item._id === action.payload._id)
            if(exists){
                state.Favourite = state.Favourite.filter((f)=> f._id !== action.payload._id)
                localStorage.setItem("wishlist", JSON.stringify(state.Favourite)) 
                state.message ='Removed from wishlist'
            }
            else{
            state.Favourite.push(action.payload)
            localStorage.setItem("wishlist", JSON.stringify(state.Favourite))  
            state.message ='Added to wishlist successfully'
            }
            },
            DeleteToWishlist:(state,action :PayloadAction<string>)=>{
                state.Favourite = state.Favourite.filter((f)=> f._id !== action.payload)
                localStorage.setItem("wishlist", JSON.stringify(state.Favourite)) 
                state.message ='Removed from wishlist'
            },
            clearmessage:(state)=>{
                state.message =''
            },
            loadWishlist: (state, action: PayloadAction<Products[]>) => {
            state.Favourite = action.payload;
    }
    }
})
export const {ToggleToWishlist,DeleteToWishlist,clearmessage,loadWishlist} = wishlistslice.actions
export default wishlistslice.reducer