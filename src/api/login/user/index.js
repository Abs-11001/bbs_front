import request from "@/utils/request";

// 用户登录接口
export function userLogin(data) {
    return request({
        url: '/bbs/login/userLogin',
        method: 'post',
        data: data
    })
}

// 判断用户token是否合理
export function checkToken(data) {
    return request({
        url: '/bbs/login/checkToken',
        method: 'post',
        data: data
    })
}