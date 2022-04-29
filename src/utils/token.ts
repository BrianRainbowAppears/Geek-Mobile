// 封装token工具模块

// token数据类型
// type tokenType = {
//   newToken: string
// }
import { Token } from '@/types/data'
const TOKEN_KEY: string = 'tokenValue'

// 获取token：把序列化的字符串转成对象
export function getToken(): Token {
  return JSON.parse(localStorage.getItem(TOKEN_KEY) ?? '{}') as Token
}
// 存储token：注意把对象序列化成字符串存储
export function setToken(newToken: Token): void {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken))
}
// 清除token
export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}
// 判断是否登录
export function isAuth(): Boolean {
  return !!getToken().token
}
