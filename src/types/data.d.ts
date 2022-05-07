// 对于项目接口，每个接口返回的数据格式都是一致的，所哟可以通过封装泛型工具函数来实现复用性
type ApiResponse<Data>={
  message: string,
  data: Data
}

export type ResponseUser = ApiResponse<User>
export type ResponseLogin = ApiResponse<Token>
export type ResponseEdit = ApiResponse<EditProfile>
export type UploadResponse = ApiResponse<{photo: string}>
export type UserChannelResponse = ApiResponse<UserChannel>
export type ArticlesResponse = ApiResponse<Articles>
export type SuggestionResponse = ApiResponse<Suggestion>

// 搜索关键词
export type Suggestion = {
  options: string[]
}

// 文章列表
export type ArticlesItem = {
  art_id: string
  aut_id: string
  aut_name: string
  comm_count: number
  cover: {
    type: 0 | 1 | 3
    images: string[]
  }
  pubdate: string
  title: string
}
export type Articles = {
  pre_timestamp: number
  results: ArticlesItem[]
}

// 频道
export type Channel = {
  id: number
  name: string
}
export type UserChannel = {
  channels: Channel[]
}

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
// 个人信息编辑页面数据格式
export type EditProfile = {
  id: string
  photo: string
  name: string
  mobile: string
  gender: number
  birthday: string
  intro: string
}