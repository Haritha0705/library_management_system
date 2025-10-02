import axios from "axios";

const AxiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    timeout:180_000,
    headers: {
    },
})
export default AxiosInstance