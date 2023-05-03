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

// 获取详细文章内容
export function getDetailArticle(query) {
    return request({
        url: '/bbs/article/getDetailArticle',
        method: 'get',
        params: query
    })
}

// 记录文章浏览记录
export function addArticleView(data) {
    return request({
        url: '/bbs/article/addArticleView',
        method: 'post',
        data: data
    })
}

// 获取首页最新最热数据
export function getHomeArticle(query) {
    return request({
        url: '/bbs/article/getHomeArticle',
        method: 'get',
        params: query
    })
}
