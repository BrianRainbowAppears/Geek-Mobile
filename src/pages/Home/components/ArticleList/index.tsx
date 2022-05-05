import ArticleItem from '@/components/ArticleItem'
import React, { useRef, useState } from 'react'
import { InfiniteScroll, List } from 'antd-mobile'
import { mockRequest } from './mock-request'
import styles from './index.module.scss'
import { getArticleList } from '@/api/home'
import { ArticlesItem, ArticlesResponse } from '@/types/data'

type Props = {
  channelId: number
}
const ArticleList = ({ channelId }: Props) => {
  // 1. 列表数据
  const [list, setList] = useState<ArticlesItem[]>([])
  // 2. hasMore 决定列表加载状态：true表示还有数据 | false 表示没有数据
  const [hasMore, setHasMore] = useState(true)
  // 存储请求参数 => 分页的时间戳
  const timestamp = useRef(Date.now())
  // 3. 加载列表数据：1. 默认会执行一次loadMore（不够一屏数据） 2. 每次列表快滚动到底部时再次执行
  async function loadMore() {
    //  1. 发请求获取数据
    const { data }: ArticlesResponse = await getArticleList({ channel_id: channelId, timestamp: timestamp.current })
    // 2. 向列表中追加list数据
    setList(val => [...val, ...data.results])
    // 3. 判断后台还有没有数据 => 1. 有数据 hasMore = true 2. 没数据 = hasMore = false  列表再次滚动不会再次执行loadMore，列表底部显示提示：没有更多数据
    if (data.pre_timestamp) {
      // data.pre_timestamp 如果存在，将作为下一次请求数据时间戳参数
      // setHasMore(data.results.length > 0)
      timestamp.current = data.pre_timestamp
    } else {
      // data.pre_timestamp 不存在了，就说明没有数据了
      setHasMore(false)
    }
  }
  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项  */}
      {list.map(item => (
        <div key={item.art_id} className="article-item">
          <ArticleItem type={1} item={item} />
        </div>
      ))}
      {/* <div className="article-item">
        <ArticleItem type={1} />
      </div> */}
      {/* <List>
        {list.map((item, index) => (
          <List.Item key={index}>{item}</List.Item>
        ))}
      </List> */}
      {/* 注意：在列表底部放置无线加载 InfiniteScroll 组件 */}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}

export default ArticleList
