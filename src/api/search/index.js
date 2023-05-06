import request from "@/utils/request";

// 全局搜索
export function searchAll(data) {
  return request({
    url: '/bbs/all/searchAll',
    method: 'get',
    params: data
  })
}