import type { ApiResponse } from "@/types/response";
import type { LoginPayload, LoginData } from "@/types/user";
import request from "@/utils/request";


export async function login(data:LoginPayload): Promise<ApiResponse<LoginData>> {
    return request({
        url: '/login',
        method: 'post',
        data,
    });
}

export const getUserInfo = () => {
    return request({
        url: '/user/info',
        method: 'get',
    });
};

export function logout() {
    return request({
        url: '/logout',
        method: 'post',
    });
};