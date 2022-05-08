import { NavBar, InfiniteScroll } from 'antd-mobile'
import { useHistory, useParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'

import Icon from '@/components/Icon'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'
import { useEffect, useState } from 'react'
import { getArticleDetail } from '@/api/detail'
import { ArticleDetail } from '@/types/data'
import { formatTime } from '@/utils/utils'
import DOMPurify from 'dompurify'
// 代码高亮的主题
import 'highlight.js/styles/dark.css'
// 骨架屏
import ContentLoader from 'react-content-loader'

const Article = () => {
  const history = useHistory()
  // 1. 获取详情数据
  // 获取文章ID
  const { artId } = useParams<{ artId: string }>()
  console.log('获取文章ID：', artId)
  // 文章详情数据
  // {} as ArticleDetail 类型断言 => 断言{}类型是 ArticleDetail
  const [detail, setDetail] = useState<ArticleDetail>({} as ArticleDetail)
  useEffect(() => {
    ;(async () => {
      const { data } = await getArticleDetail(artId)
      console.log('文章详情：', data)
      setDetail(data)
      // 关闭骨架屏
      setShow(false)
    })()
  }, [artId])

  const loadMoreComments = async () => {
    console.log('加载更多评论')
  }

  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper">
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{detail.title}</h1>

            <div className="info">
              <span>{formatTime(detail.pubdate, 'YYYY/MM/DD')}</span>
              <span>{detail.read_count} 阅读</span>
              <span>{detail.comm_count} 评论</span>
            </div>

            <div className="author">
              <img src={detail.aut_photo} alt="" />
              <span className="name">{detail.aut_name}</span>
              <span className={classNames('follow', detail.is_followed ? 'followed' : '')}>
                {detail.is_followed ? '已关注' : '关注'}
              </span>
            </div>
          </div>

          <div className="content">
            {/* dangerouslySetInnerHTML 类似vue的v-html */}
            {/* 效果：能渲染html的dom片段, <span>123</span> */}
            <div
              className="content-html dg-html"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(detail.content) }}
            />
            <div className="date">发布文章时间：{formatTime(detail.pubdate)}</div>
          </div>
        </div>
        {/* 2. 对文章评论结构 */}
        <div className="comment">
          <div className="comment-header">
            <span>全部评论（10）</span>
            <span>20 点赞</span>
          </div>

          <div className="comment-list">
            <CommentItem />

            <InfiniteScroll hasMore={false} loadMore={loadMoreComments} />
          </div>
        </div>
      </div>
    )
  }

  // 2. 骨架屏loading效果
  const [show, setShow] = useState(true)
  if (show) {
    // 数据加载中，显示骨架屏。。。
    return (
      <ContentLoader viewBox="0 0 375 650" height={650} width={375}>
        <rect x="0" y="0" rx="5" ry="5" width="40%" height="20" />
        <rect x="0" y="42" rx="5" ry="5" width="100%" height="200" />
        <rect x="0" y="265" rx="5" ry="5" width="100%" height="10" />
        <rect x="0" y="285" rx="5" ry="5" width="100%" height="10" />
        <rect x="0" y="305" rx="5" ry="5" width="100%" height="10" />
        <rect x="0" y="335" rx="5" ry="5" width="65%" height="10" />
        <rect x="75%" y="335" rx="5" ry="5" width="10%" height="10" />
        <rect x="0" y="355" rx="5" ry="5" width="65%" height="10" />
        <rect x="75%" y="355" rx="5" ry="5" width="30%" height="10" />
        <rect x="0" y="375" rx="5" ry="5" width="65%" height="10" />
        <rect x="75%" y="375" rx="5" ry="5" width="30%" height="10" />
        <rect x="0" y="395" rx="5" ry="5" width="65%" height="8" />
        <rect x="75%" y="395" rx="5" ry="5" width="30%" height="8" />
        <rect x="0" y="415" rx="5" ry="5" width="65%" height="8" />
        <rect x="75%" y="415" rx="5" ry="5" width="30%" height="8" />
        <rect x="0" y="445" rx="5" ry="5" width="65%" height="8" />
        <rect x="75%" y="445" rx="5" ry="5" width="30%" height="8" />
        <rect x="0" y="465" rx="5" ry="5" width="65%" height="8" />
        <rect x="75%" y="465" rx="5" ry="5" width="30%" height="8" />
        <rect x="0" y="485" rx="5" ry="5" width="65%" height="8" />
        <rect x="75%" y="485" rx="5" ry="5" width="30%" height="8" />
        <rect x="0" y="505" rx="5" ry="5" width="65%" height="8" />
        <rect x="75%" y="505" rx="5" ry="5" width="30%" height="8" />
        <rect x="0" y="525" rx="5" ry="5" width="65%" height="8" />
        <rect x="75%" y="525" rx="5" ry="5" width="30%" height="8" />
        <rect x="75%" y="550" rx="5" ry="5" width="10%" height="10" />
        <circle cx="76.5%" cy="590" r="18" />
        <circle cx="80%" cy="590" r="18" />
        <circle cx="83.5%" cy="590" r="18" />
        <circle cx="87%" cy="590" r="18" />
        <circle cx="90.5%" cy="590" r="18" />
        <circle cx="94%" cy="590" r="18" />
      </ContentLoader>
    )
  }

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        <NavBar
          onBack={() => history.go(-1)}
          right={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {true && (
            <div className="nav-author">
              <img src={detail.aut_photo} alt="" />
              <span className="name">{detail.aut_name}</span>
              <span className={classNames('follow', detail.is_followed ? 'followed' : '')}>
                {detail.is_followed ? '已关注' : '关注'}
              </span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}

        {/* 底部评论栏 */}
        <CommentFooter />
      </div>
    </div>
  )
}

export default Article
