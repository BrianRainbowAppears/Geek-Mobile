// 封装http工具函数

import store from '@/store'
import { Toast } from 'antd-mobile'
// import { logoutAction } from '@/store/actions/login'
import axios from 'axios'
import customHistory from './history'

// 添加axios实例
const request = axios.create({
  // 配置基准路径：
  baseURL: 'http://toutiao.itheima.net/v1_0',
  // 动态读取当前运行环境文件：
  // baseURL: process.env.REACT_APP_URL,
  timeout: 5000
})

// 请求拦截器：统一为请求头、添加token
request.interceptors.request.use(config => {
  const {
    loginReducer: { token }
  } = store.getState()
  if (!config.url?.startsWith('/authorizations')) {
    // 此处需要使用非空断言 来去掉headers类型中的undefined类型，告诉ts类型是安全的
    config.headers!.Authorization = `Bearer ${token}`
  }
  return config
})
// 响应拦截器
request.interceptors.response.use(
  function (response) {
    // 相映成功操作
    // 通常在此去除返回数据的一层data壳
    return response.data
  },
  function (error) {
    // 响应失败处理
    // 通常在此处理401 token失效：
    if (error.response.status === 401) {
      Toast.show({
        content: error.response.data?.message || '没有登录或token过期了',
        icon: 'fail',
        afterClose: () => {
          // 1. 删除Redux中token
          // 2. 删除Redux中个人数据
          // 3. 删除本地存储token
          // store.dispatch(logoutAction())
          // 跳转登录页
          customHistory.push({
            pathname: 'login',
            state: {
              from: customHistory.location.pathname
            }
          })
        }
      })
    }

    return Promise.reject(error)
  }
)
export default request