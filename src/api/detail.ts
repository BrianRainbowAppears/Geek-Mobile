import { ArticleDetailResponse } from './../types/data.d'
import request from '@/utils/request'

// 获取文章详情
export function getArticleDetail(id: string): Promise<ArticleDetailResponse> {
  return request.get(`/articles/${id}`)
}

// 关注作者
export function follow(id: string) {
  return request.post('/user/followings', {
    target: id
  })
}
// 取关作者
export function unFollow(id: string) {
  return request.delete(`/user/followings/${id}`)
}
