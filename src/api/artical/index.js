import request from "@/utils/request";

// 发布文章
export function publishArtical(data) {
    return request({
        url: '/bbs/artical/publish',
        method: 'post',
        data: data
    })
}

// 获取文章列表
export function getArticalList(query) {
    return request({
        url: '/bbs/artical/getArticalList',
        method: 'get',
        params: query
    })
}