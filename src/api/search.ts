import { SuggestionResponse } from './../types/data.d'
import request from '@/utils/request'

// 获取搜索联想词
type ParmasSuggest = {
  q: string
}
// 获取搜索联想词
// params 输入匹配联想词的关键词
export function getSuggestion(params: ParmasSuggest): Promise<SuggestionResponse> {
  return request.get('/suggestion', { params })
}
