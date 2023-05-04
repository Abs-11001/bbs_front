import request from "@/utils/request";

// 获取首页图片轮播图
export function getImageCarousel(data) {
    return request({
        url: '/bbs/carousel/getImageCarousel',
        method: 'get',
        params: data
    })
}