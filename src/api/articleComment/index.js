import request from "@/utils/request";

// 添加评论
export function addArticleComment(data) {
    return request({
        url: '/bbs/articleComment/addArticleComment',
        method: 'post',
        data: data
    })
}

// 通过文章id加载评论
export function getArticleComment(data) {
    return request({
        url: '/bbs/articleComment/getArticleComment',
        method: 'get',
        params: data
    })
}