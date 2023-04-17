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