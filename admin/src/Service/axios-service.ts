import axios from "axios";

const AxiosService = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 180_000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default AxiosService;
