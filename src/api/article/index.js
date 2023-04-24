import request from "@/utils/request";

// 发布文章
export function publishArticle(data) {
    return request({
        url: '/bbs/article/publish',
        method: 'post',
        data: data
    })
}

// 获取文章列表
export function getArticleList(query) {
    return request({
        url: '/bbs/article/getArticleList',
        method: 'get',
        params: query
    })
}