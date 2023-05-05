import request from "@/utils/request";

// 获取首页图片轮播图
export function getImageCarousel(data) {
    return request({
        url: '/bbs/carousel/getImageCarousel',
        method: 'get',
        params: data
    })
}

// 获取文字轮播数据
export function getTextCarousel(data) {
    return request({
        url: '/bbs/carousel/getTextCarousel',
        method: 'get',
        params: data
    })
}