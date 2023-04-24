import request from "@/utils/request";

// 发布文章
export function publishArtical(data) {
    return request({
        url: '/bbs/artical/publish',
        method: 'post',
        data: data
    })
}