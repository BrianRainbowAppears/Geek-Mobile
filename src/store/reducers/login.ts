import { Token } from '@/types/data'

// 登录模块：存储token
const initialState: Token = {
  token: '', // 用户token的令牌
  refresh_token: '' // 用于刷新用户token的令牌
}

export const loginReducer = (state = initialState, action: unknown) => {
  return state
}
