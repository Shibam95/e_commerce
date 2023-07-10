import axios from "axios";

let axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});


export default axiosInstance;

