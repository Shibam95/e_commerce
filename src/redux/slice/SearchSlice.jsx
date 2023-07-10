import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/apiUrl";

const initialState = ({
    status: "idel",
    search_blog:{ }
})

export const Searchblog = createAsyncThunk(`search`, async (id) => {
    try {
        let res = await axiosInstance.get(`search/${id}`);
        return res?.data;
    } catch (error) {
        console.log(error);
    }
})

 const SearchSlice = createSlice({
    name: "searchblog",
    initialState,
   
    extraReducers: {
        [Searchblog.pending]: (state) => {
            state.status = "loading......";
         
        },
        [Searchblog.fulfilled]: (state, { payload }) => {
            state.search_blog = payload
        },
        [Searchblog.rejected]: (state) => {
            state.status = "Rejected";
        },
    },
})


export default SearchSlice.reducer
