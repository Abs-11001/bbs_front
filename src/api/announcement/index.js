import request from "@/utils/request";

// 获取校内各个部门通知公告
export function getAnnouncement(query) {
    return request({
        url: '/bbs/announcement/getAnnouncement',
        method: 'get',
        params: query
    })
}

// 获取要展示的板块
export function getAnnouncementKey() {
    return request({
        url: '/bbs/announcement/getAnnouncementKey',
        methos: 'get'
    })
}

// 通过uuid获取通知公告的具体内容
export function getAnnouncementData(query) {
    return request({
        url: '/bbs/announcement/getAnnouncementData',
        methos: 'get',
        params: query
    })
}

// 通过uuid获取通知公告的相关信息
export function getAnnouncementWithUuid(query) {
    return request({
        url: '/bbs/announcement/getAnnouncementWithUuid',
        methos: 'get',
        params: query
    })
}