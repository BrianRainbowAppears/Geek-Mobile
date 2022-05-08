import { useHistory } from 'react-router-dom'
import { InfiniteScroll, NavBar } from 'antd-mobile'

import ArticleItem from '@/components/ArticleItem'

import styles from './index.module.scss'
import { useRef, useState } from 'react'
import { getSearchList } from '@/api/search'
import { ArticlesItem, SearchResultResponse } from '@/types/data'

const Result = () => {
  // 根据搜索页面跳转携带的关键词，查询接口，获取搜索结果的列表

  const history = useHistory()
  // 获取搜索的参数
  const query = new URLSearchParams(window.location.search)
  const q = query.get('q') ?? ''
  console.log('查询参数：', q)
  const [list, setList] = useState<ArticlesItem[]>([])
  // useEffect(() => {
  //   ;(async () => {
  //     const { data } = await getSearchList({
  //       q,
  //       page: 1
  //     })
  //     console.log('结果：', data)
  //     setList(data.results)
  //   })()
  // }, [q])

  // 渲染搜索结果列表
  const renderArticleList = () => {
    return list.map((item, index) => {
      return (
        <div key={item.art_id} className="article-item" onClick={() => history.push(`/article/${item.art_id}`)}>
          <ArticleItem type={1} item={item} />
        </div>
      )
    })
  }

  // 无限加载
  const [hasMore, setHasMore] = useState(true)
  const page = useRef(1)
  async function loadMore() {
    const { data }: SearchResultResponse = await getSearchList({
      q,
      page: page.current
    })

    setList([...list, ...data.results])
    if (data.total_count === list.length) {
      setHasMore(false)
    } else {
      page.current++
    }
  }

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
      {/* 搜索结果的新闻列表 */}
      <div className="article-list">
        {renderArticleList()}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </div>
  )
}

export default Result
