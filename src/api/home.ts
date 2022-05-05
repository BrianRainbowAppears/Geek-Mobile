import { ArticlesResponse } from './../types/data.d'
import  request  from '@/utils/request'

// 获取文章列表数据
type ParmasArticle = {
  channel_id: number // 当前文章所在的频道ID
  timestamp: number // 查询新闻的截止时间 => 例子：Date.now() 返回当前时间之前的10条新闻
}
export function getArticleList(
  parmas: ParmasArticle 
): Promise<ArticlesResponse> {
  return request.get('/articles', { params: parmas })
}