import axios from "axios";

const AxiosInstance = axios.create({
    baseURL:"http://localhost:3000",
    timeout:5000,
    headers: {
    },
})
export default AxiosInstance