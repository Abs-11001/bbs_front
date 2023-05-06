import request from "@/utils/request";

// 记录点赞
export function recordUserLike(data) {
    return request({
        url: '/bbs/articleLike/recordUserLike',
        method: 'post',
        data: data
    })
}

// 获取当前用户对当前文章是否已经点赞
export function getCurUserLike(data) {
    return request({
        url: '/bbs/articleLike/getCurUserLike',
        method: 'get',
        params: data
    })
}