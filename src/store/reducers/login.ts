import { Token } from '@/types/data'
import { loginAction } from '@/types/store'
import { getToken } from '@/utils/token'

// 登录模块：存储token
const initialState: Token = getToken() || {
  token: '', // 用户token的令牌
  refresh_token: '' // 用于刷新用户token的令牌
}

export const loginReducer = (state = initialState, action: loginAction) => {
  if (action.type === 'login/token') {
    return action.payload
  } 
  if (action.type === 'login/logout') {
    return {}
  }
  return state
}
