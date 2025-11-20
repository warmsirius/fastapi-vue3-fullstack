import request from "@/utils/request";

interface LoginPayload {
    username: string;
    password: string;
}

export async function login(data: LoginPayload) {
    return request({
        url: '/login',
        method: 'POST',
        data: data
    });
};

export async function getUserInfo(accessToken: string) {
    return request({
        url: '/user/info',
        method: 'GET',
        data: {
            accessToken
        }
    });
};

export function logout(accessToken: string) {
    return request({
        url: '/logout',
        method: 'POST',
        data: {
            accessToken
        }
    });
};