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
              <span>{detail.pubdate}</span>
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
            <div className="content-html dg-html" dangerouslySetInnerHTML={{ __html: detail.content }} />
            <div className="date">发布文章时间：{detail.pubdate}</div>
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
