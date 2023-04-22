import request from "@/utils/request";

export function userLogin(data) {
    return request({
        url: '/bbs/login/userLogin',
        method: 'post',
        data: data
    })
}