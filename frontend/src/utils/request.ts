import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const baseURL = (import.meta.env.VITE_API_BASE_URL as string) || ''

const instance: AxiosInstance = axios.create({
    baseURL,
    timeout: 10000,
})

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 在此处可注入 token，例如：
        // const token = localStorage.getItem('token')
        // if (token) config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` }
        return config
    },
    (error: AxiosError) => Promise.reject(error),
)

instance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error: AxiosError) => Promise.reject(error),
)

export default instance