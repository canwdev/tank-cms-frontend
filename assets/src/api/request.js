// 封装 axios
import axios from 'axios'

const service = axios.create({

  baseURL: process.env.baseUrl + '/api_blog', // url = base url + request url
  timeout: 10000 // request timeout
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data

    if (res.code === 0) { // 错误代码，0表示正常，其他表示发生错误
      return res
    } else {
      return Promise.reject(res)
    }
  },
  (error) => {
    // console.error('request error', error)
    return Promise.reject(error)
  }
)

export default service
