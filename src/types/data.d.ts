// 后台返回数据的类型
export type Token = {
  token: string
  refresh_token: string
} 
// form登录表单的类型
export type FormData = {
  mobile: string
  code: string
}