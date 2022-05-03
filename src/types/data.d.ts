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
// 登陆之后=》准备接口需要的用户信息类型
export type User = {
  id: string // 用户ID
  name: string // 用户名
  photo: string // 用户头像
  art_count: number // 发布文章数量
  follow_count: number // 关注数量
  fans_count: number // 粉丝数量
  like_count: number // 被点赞数量
}
