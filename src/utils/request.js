import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken, getRandom, removeToken } from '@/utils/auth'

axios.defaults.baseURL = process.env.BASE_API
axios.defaults.withCredentials = true
// 让ajax携带cookie

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 30000
})

axios.defaults.headers.post = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
}
//
axios.defaults.transformRequest = [function(data) {
  var newData = ''
  for (var k in data) {
    newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
  }
  return newData
}]

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // 让每个请求携带token-- ['x-auth-token']为自定义key 请根据实际情况自行修改
    config.headers['x-auth-token'] = getToken() || ''
    config.headers['x-auth-random'] = getRandom()
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    // 判断是否是返回文件流
    const contentDisposition = typeof (response.headers['content-disposition']) === 'undefined' ? false : response.headers['content-disposition'].indexOf('attachment') > -1
    if (res.code === '200' || res.code === 200 || response.status === 200 && contentDisposition) {
      return response
    } else if (res.code === '401' || res.code === 401 || res.code === '400' || res.code === 400) {
      // 401:非法的token;;
      MessageBox.confirm(res.msg + '，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }).catch(() => {
      })
      // 登录失效，清空随机码，清空token
      removeToken()
    } else {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    }
  },
  error => {
    Message({
      message: '网络错误',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
