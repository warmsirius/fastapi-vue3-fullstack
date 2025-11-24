import { tokenName } from '@/config'
import { useUserStore } from '@/stores/user'
import { ElMessage } from "element-plus";
import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const baseURL = (import.meta.env.VITE_API_BASE_URL as string) || ''

const instance: AxiosInstance = axios.create({
    baseURL,
    timeout: 10000,
})

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 将token添加到请求头中
        if(useUserStore().accessToken){
            config.headers[tokenName] = useUserStore().accessToken
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error),
)

// 响应拦截器
instance.interceptors.response.use(
    (response: AxiosResponse) => { 
        const { data, config } = response;
        
        // 判断data是否为undefined或null
        if (data === undefined || data === null) {
            ElMessage.error("后端接口返回数据为空");
            return Promise.reject(new Error(`请求错误：${config.url}，未返回任何数据`));
        }

        // 安全解构code和message,避免undefined异常
        const code = data.code !== undefined ? data.code : null;
        const message = data.message !== undefined ? data.message : '';

        

        return response.data
    },
    (error: AxiosError) => Promise.reject(error),
)

export default instance