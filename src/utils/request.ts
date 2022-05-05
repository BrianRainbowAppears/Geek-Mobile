// 封装http工具函数

import store from '@/store'
import { logout } from '@/store/actions/login'
import { Toast } from 'antd-mobile'
// import { logoutAction } from '@/store/actions/login'
import axios, { AxiosError } from 'axios'
import customHistory from './history'
import { isAuth, setToken } from './token'

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
  async function  (error) {
    // 响应失败处理
    // 通常在此处理401 token失效：
    if (error.response.status === 401) {
      // Toast.show({
      //   content: error.response.data?.message || '没有登录或token过期了',
      //   icon: 'fail',
      //   afterClose: () => {
      //     // 1. 删除Redux中token
      //     // 2. 删除Redux中个人数据
      //     // 3. 删除本地存储token
      //     // store.dispatch(logoutAction())
      //     // 跳转登录页（在点击登陆时使用history.push(location.state.from拿到之前登录路径进行快速访问)）
      //     customHistory.push({
      //       pathname: '/login',
      //       state: {
      //         from: customHistory.location.pathname
      //       }
      //     })
      //   }
      // })
      // 401无感刷新token => 不需要重新登陆
      /**
       * **步骤**：
          1. 401情况，使用 try-catch 处理异常，捕获异常时，清除本地 token和清空 redux token，提示消息并跳转到登录页面，最后抛出错误
          2. 判断是否登录：
            1. 没有登录：直接抛出异常，无需刷新
            2. 登录过：使用 `refresh_token` 通过默认的 axios 发送请求，换取新的 token
          3. 将新获取到的 token 存储到本地缓存中和 redux 中
          4. 使用封装的axios**继续发送原来的请求**

          注意：refresh_token有过期时间，一般比token过期时间长
       */
      try {
        // 1. 没有登陆过
        if (!isAuth()) {
          throw new Error(error)
        }
        // 2. 登陆过 => 实现 无感刷新token
        // 使用 refresh——token 通过默认的axios发送请求，换取新token
        const {refresh_token} = store.getState().loginReducer
        // 注意：使用axios发送请求
        const {data} = await axios.put('http://toutiao.itheima.net/v1_0/authorizations', null, {
          headers: {
            Authorization: `Bearer ${refresh_token}`
          }
        })
        // 组装新token，存到本地和redux
        const newToken = {
          token: data.data.token,
          refresh_token
        }
        // 1. 本地存储
        setToken(newToken)
        // 2. redux存储
        store.dispatch({ type: 'login/token', payload: newToken })
        // 把原来401的请求，重新发送一次
        // error.config 上次401请求的配置 (url, method, 参数等)
        return request(error.config)

      } catch (error) {
        // 无感刷新后还是捕获异常，继续调用之前的方式，跳登录页清空token
        const e = error as AxiosError<{message: string}>
        Toast.show({
            content: e.response!.data?.message || '没有登录或token过期了',
            icon: 'fail',
            afterClose: () => {
              // 清空token
              store.dispatch<any>(logout())
              // 跳转登录也
              customHistory.push({
                pathname: '/login',
                state: {
                  from: customHistory.location.pathname
                }
              })
            }
          })
      }
    }

    return Promise.reject(error)
  }
)
export default request