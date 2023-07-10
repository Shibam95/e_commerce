import{createAsyncThunk,createSlice} from '@reduxjs/toolkit'
//import axios from 'axios'
import axiosInstance from '../../Api/apiUrl'
const initialState = ({
    blog_details:{ }
})

export const BlogDetailspart = createAsyncThunk(`blogdetails`, async (id) => {
    try {
        let res = await axiosInstance.get(`blogdetails/${id.id}`);
        return res?.data;
    } catch (error) {
        console.log(error);
    }
})

export const BlogDetailsSlice = createSlice({
    name: "blogdetails",
    initialState,
   
    extraReducers: {
        [BlogDetailspart.pending]: (state) => {
            state.status = "loading......"; 
        },
        [BlogDetailspart.fulfilled]: (state, { payload }) => {
            state.blog_details = payload
        },
        [BlogDetailspart.rejected]: (state) => {
        },
    },
})

export default BlogDetailsSlice.reducer

