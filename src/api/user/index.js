import request from "@/utils/request";

// 用户登录接口
export function userLogin(data) {
    return request({
        url: '/bbs/user/login',
        method: 'post',
        data: data
    })
}

// 判断用户token是否合理
export function checkToken(data) {
    return request({
        url: '/bbs/user/checkToken',
        method: 'post',
        data: data
    })
}

// 用户注册接口
export function userRegister(data) {
    return request({
        url: '/bbs/user/register',
        method: 'post',
        data: data
    })
}

// 用户退出接口
export function userLogout(data) {
    return request({
        url: '/bbs/user/logout',
        method: 'post',
        data: data
    })
}


// 通过uuid查询用户信息
export function getUserInformation(data) {
    return request({
        url: '/bbs/user/getUserInformation',
        method: 'get',
        params: data
    })
}

// 修改用户信息
export function updateUserInformation(data) {
    return request({
        url: '/bbs/user/updateUserInformation',
        method: 'post',
        data: data
    })
}