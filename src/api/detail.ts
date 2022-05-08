import { ArticleDetailResponse } from './../types/data.d'
import request from '@/utils/request'

// 获取文章详情
export function getArticleDetail(id: string): Promise<ArticleDetailResponse> {
  return request.get(`/articles/${id}`)
}
