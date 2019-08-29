import request from './request'
import axios from 'axios'

// {key,value,type}
export function saveHitokoto(data) {
  return request({
    url: '/tools/saveHitokoto',
    method: 'post',
    data
  })
}

export function getHitokoto() {
  return axios.get('https://v1.hitokoto.cn/')
}
