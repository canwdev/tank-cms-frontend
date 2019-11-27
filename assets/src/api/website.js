import request from './request'

export function getWebsiteMenu() {
  return request({
    url: '/menu/list',
    method: 'get'
  })
}

export function getPostsList(params) {
  return request({
    url: '/post/list',
    method: 'get',
    params
  })
}

export function getPostDetail(params) {
  return request({
    url: '/post/detail',
    method: 'get',
    params
  })
}
