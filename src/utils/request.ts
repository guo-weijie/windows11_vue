import axios from 'axios'

const server = axios.create({
  // baseURL: 'https://api.muxiaoguo.cn/api/',
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截
server.interceptors.request.use(config => {
  if (config.method === 'get') {
    config.params.api_key = '7f030309fdf56dac'
  } else {
    config.data.api_key = '7f030309fdf56dac'
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截
server.interceptors.response.use(res => {
  if (res.status === 200) {
    return res.data
  }
  return Promise.reject(res)
}, err => {
  return Promise.reject(err)
})

export default server