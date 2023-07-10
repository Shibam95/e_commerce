import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//action
export const fetchApi= createAsyncThunk('fetchApi',async()=>{
    const response=await axios.get('https://fakestoreapi.com/products')
    return response.data;
})
const Apislice=createSlice({
   name: 'api',
   initialState:{
    isLoading: false,
    data: null,
    isError: false
   },
   extraReducers:(builder)=>{
    builder.addCase(fetchApi.pending, (state,action)=>{
        state.isLoading=true;

    });
builder.addCase(fetchApi.fulfilled, (state,action)=>{
    state.isLoading= false;
   state.data=action.payload
});
builder.addCase(fetchApi.rejected, (state,action)=>{
    console.log("Error", action.payload);
    state.isError=true;
})
   
}
})
export default Apislice.reducer;