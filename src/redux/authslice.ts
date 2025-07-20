import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState{
    token: string 
    userId: string 
    role: string 
}

const initialState :AuthState ={
    token : "",
    userId :"",
    role :""
}
const authslice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuth:(state,action :PayloadAction<AuthState>)=>{
            state.token = action.payload.token
            state.userId = action.payload.userId
            state.role = action.payload.role
        },
        LogOut:(state)=>{
            state.token = ""
            state.userId = ""
            state.role = ""
        }
    }
})
export const {setAuth,LogOut} = authslice.actions
export default authslice.reducer
