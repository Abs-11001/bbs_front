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
        method: 'get'
    })
}

// 通过uuid获取通知公告的具体内容
export function getAnnouncementData(query) {
    return request({
        url: '/bbs/announcement/getAnnouncementData',
        method: 'get',
        params: query
    })
}

// 通过uuid获取通知公告的相关信息
export function getAnnouncementWithUuid(query) {
    return request({
        url: '/bbs/announcement/getAnnouncementWithUuid',
        method: 'get',
        params: query
    })
}

// 获取当前登录用户未读公告
export function getNoReadAnnouncement(query) {
    console.log(query)
    return request({
        url: '/bbs/announcement/getNoReadAnnouncement',
        method: 'get',
        params: query
    })
}

// 记录用户读了公告
export function recordRead(data) {
    return request({
        url: '/bbs/announcement/recordRead',
        method: 'post',
        data: data
    })
}