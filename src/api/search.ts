import { SearchResultResponse, SuggestionResponse } from './../types/data.d'
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

// 获取搜索结果列表
type ParmasSearch = {
  q: string  // 查询关键词
  page?: number  // 页码
  per_page?: number  // 每页数量
}
export function getSearchList(params: ParmasSearch): Promise<SearchResultResponse> {
  return request.get('/search', { params })
}
