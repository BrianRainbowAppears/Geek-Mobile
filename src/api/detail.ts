import { ArticleCommentResponse, ArticleDetailResponse } from './../types/data.d'
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

// 获取评论数据
/**
 *
 * @param type a或c 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param id 文章id或评论id
 * @param offset 获取评论数据的偏移量，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * @returns
 */
export function getComments(type: string, id: string, offset: string | null): Promise<ArticleCommentResponse> {
  return request.get('/comments', { params: { type, source: id, offset } })
}
