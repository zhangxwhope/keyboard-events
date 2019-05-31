import axios from 'axios'

const fetch = axios.create({
  baseUrl: '/',
  timeout: 15000,
  headers: {}
})

// 添加请求拦截器
fetch.interceptors.request.use(config => {
// 在发送请求之前做些什么
  if (config.method === 'post') {
    config.headers['Content-Type'] = 'application/json'
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
fetch.interceptors.response.use(response => {
  // 对响应数据做点什么
  const { ret } = response.data
  if (ret === 0) {
    return response.data
  } else {
    // return Promise.reject('服务器错误')
  }
}, error => {
  // 对响应错误做些什么
  return Promise.reject(error)
})

export {
  fetch
}
