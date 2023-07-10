import { configureStore } from "@reduxjs/toolkit";
import ApiReducer, { fetchApi } from './slice/Apislice'
import CartReducer, { getTotal } from "./slice/Cartslice";
import AuthReducer from './slice/AuthSlice'
import StudentReducer from './slice/StudentSlice'
import BlogReducer from './slice/BlogSlice'
import BlogDetailsReducer from "../redux/slice/BlogDetailsSlice";
import CategoryReducer from "./slice/CategorySlice";
import CatBlogReducer from './slice/CatBlogSlice'
import SearchReducer from './slice/SearchSlice'
export const Store = configureStore({
    reducer:{
        api:ApiReducer,
        cart:CartReducer,
        auth:AuthReducer,
        StudentData:StudentReducer,
        blog:BlogReducer,
        blogdetails:BlogDetailsReducer,
        category:CategoryReducer,
        catblog:CatBlogReducer,
        searchblog:SearchReducer,
    }
})
Store.dispatch(fetchApi());
Store.dispatch(getTotal());
