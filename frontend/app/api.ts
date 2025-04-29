import axios from "axios";
import { ACCESS_TOKEN } from "./constants";
import { terminal } from "virtual:terminal";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(
    (config) => {
        if(typeof window !== "undefined") {
            const token = sessionStorage.getItem(ACCESS_TOKEN);
            if(token){
                config.headers.Authorization = `Bearer ${token}`;
                terminal.log(config.headers.Authorization);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;