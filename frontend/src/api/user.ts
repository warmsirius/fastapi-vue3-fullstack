import request from "@/utils/request";

interface LoginPayload {
    username: string;
    password: string;
}

export const login = (data: LoginPayload) => {
    return request({
        url: '/login',
        method: 'post',
        data: data
    });
};

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