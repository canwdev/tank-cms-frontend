import request from './request'

export function getList(params) {
  return request({
    url: '/post/list',
    method: 'get',
    params
  })
}

export function getDetail(params) {
  return request({
    url: '/post/detail',
    method: 'get',
    params
  })
}
