// 对于项目接口，每个接口返回的数据格式都是一致的，所哟可以通过封装泛型工具函数来实现复用性
type ApiResponse<Data> = {
  message: string
  data: Data
}

export type ResponseUser = ApiResponse<User>
export type ResponseLogin = ApiResponse<Token>
export type ResponseEdit = ApiResponse<EditProfile>
export type UploadResponse = ApiResponse<{ photo: string }>
export type UserChannelResponse = ApiResponse<UserChannel>
export type ArticlesResponse = ApiResponse<Articles>
export type SuggestionResponse = ApiResponse<Suggestion>
export type SearchResultResponse = ApiResponse<SearchResult>
export type ArticleDetailResponse = ApiResponse<ArticleDetail>
export type ArticleCommentResponse = ApiResponse<ArticleComment>
export type AddArticleCommnetResponse = ApiResponse<AddArticleCommnet>

// 文章发布评论的类型
// 注意：接口文档中的返回类型与后台接口返回数据不一致
export type AddArticleCommnet = {
  com_id: string
  new_obj: ArticleCommentItem
  target: string
}

// 评论项的类型
export type ArticleCommentItem = {
  com_id: string
  aut_id: string
  aut_name: string
  aut_photo: string
  like_count: number
  reply_count: number
  pubdate: string
  content: string
  is_liking: boolean
  is_followed: boolean
}
// 文章评论的类型
export type ArticleComment = {
  total_count: number
  end_id: string | null
  last_id: string | null
  results: ArticleCommentItem[]
}

// -- 文章详情 --
export type ArticleDetail = {
  art_id: string
  title: string
  pubdate: string
  aut_id: string
  aut_name: string
  aut_photo: string
  is_followed: boolean
  attitude: number
  content: string
  is_collected: boolean
  // 接口中缺失
  comm_count: number
  like_count: number
  read_count: number
}

// 搜索结果
export type SearchResult = {
  page: number
  per_page: number
  total_count: number
  results: Articles['results']
}

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
