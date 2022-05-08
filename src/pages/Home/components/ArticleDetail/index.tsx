import { NavBar, InfiniteScroll, Popup } from 'antd-mobile'
import { useHistory, useParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'

import Icon from '@/components/Icon'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'
import { useEffect, useRef, useState } from 'react'
import { addCommentApi, follow, getArticleDetail, getComments, unFollow } from '@/api/detail'
import { ArticleCommentItem, ArticleDetail } from '@/types/data'
import { formatTime } from '@/utils/utils'
import DOMPurify from 'dompurify'
// 代码高亮的主题
import 'highlight.js/styles/dark.css'
// 骨架屏
import ContentLoader from 'react-content-loader'
import NoneComment from '@/components/NoneComment'
import CommentInput from './components/CommentInput'

// 使用枚举类型来指定评论类型：
// 语法：enum 枚举名字 { 枚举属性1=值1， 枚举属性2=值2 }
enum CommentType {
  Article = 'a', // 对文章进行评论
  Comment = 'c' // 对评论进行回复
}
// 使用：
// CommentType.Article

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

  // 3. 点击底部评论图标，滚动wrapper盒子，到comment盒子位置
  // 核心：计算滚动高度。评论区距离页面顶部滚动高度 = 评论区元素距离页面可视区顶部高度 - 页面头部元素高度 + 页面内容滚动高度(默认0)
  // 思路：
  // 1. 获取滚动区域盒子和目标位置盒子的DOM对象
  // 2. 计算目标位置距离页面顶部滚动高度
  // 3. wrapper盒子根据上一步计算的滚动高度进行滚动
  // 滚动区域盒子
  const scrollBoxRef = useRef<HTMLDivElement>(null)
  // 目标位置盒子
  const commentBoxRef = useRef<HTMLDivElement>(null)
  // 是否滚动到目标位置：false 还没有滚动到评论区  true 已经滚动到评论区
  const isComment = useRef(false)
  // 执行计算和滚动的方法
  const goComment = () => {
    const scrollBox = scrollBoxRef.current
    const commentBox = commentBoxRef.current
    if (!scrollBox || !commentBox) return
    // console.log(scrollBox, commentBox)
    // console.log(commentBox.getBoundingClientRect().top, scrollBox.scrollTop)
    if (!isComment.current) {
      // 滚动到评论区
      scrollBox.scrollTo({
        top: commentBox.getBoundingClientRect().top - 45 + scrollBox.scrollTop,
        behavior: 'smooth'
      })
      // 设置为true，代表已经滚动到评论区 => 下次点击回顶
      isComment.current = true
    } else {
      scrollBox.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      isComment.current = false
    }
  }

  // 4. 关注作者
  const onFollow = async () => {
    // 思路：点击关注按钮
    // 1. 没有关注 => 执行关注作者
    // 2. 关注过 => 执行取关
    if (detail.is_followed) {
      // 数据库取关
      await unFollow(detail.aut_id)
      // 本地取关
      setDetail({ ...detail, is_followed: false })
    } else {
      // 关注
      await follow(detail.aut_id)
      setDetail({ ...detail, is_followed: true })
    }
  }

  // 5. 获取当前文章的评论列表数据
  const [commentList, setCommentList] = useState<ArticleCommentItem[]>([])
  const [hasMore, setHasMore] = useState(true)
  // 获取评论数据分页参数
  const offset = useRef<string | null>(null)
  async function loadMore() {
    const {
      data: { total_count, results, last_id }
    } = await getComments(CommentType.Article, artId, offset.current)

    setCommentList([...commentList, ...results])
    if (total_count === commentList.length) {
      // 后台数据的总数 = 加载数量 => 没有数量了
      setHasMore(false)
    } else {
      // 还有数据，使用后台返回的last_id作为下一页数据请求的起点
      offset.current = last_id
    }
  }

  // 6. 对文章发表评论
  const [showComment, setShowComment] = useState(false)
  // 打开评论弹层
  const openComment = () => {
    setShowComment(true)
  }
  // 关闭弹层
  const closeComment = () => {
    setShowComment(false)
  }
  // 对文章发表评论
  const addComment = async (content: string) => {
    console.log('子组件传给父的评论内容：', content)
    try {
      const { data } = await addCommentApi({
        target: detail.art_id,
        content
      })
      // 更新评论列表
      commentList.length > 0 && setCommentList([data.new_obj, ...commentList])
      // 更新评论数量
      setDetail({ ...detail, comm_count: detail.comm_count + 1 })
      closeComment()
    } catch (error) {}
  }

  // const loadMoreComments = async () => {
  //   console.log('加载更多评论')
  // }

  const renderArticle = () => {
    // 文章详情
    return (
      // 可滚动区域盒子
      <div ref={scrollBoxRef} className="wrapper">
        {/* 1. 文章详情结构 */}
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
              <span onClick={onFollow} className={classNames('follow', detail.is_followed ? 'followed' : '')}>
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
        <div ref={commentBoxRef} className="comment">
          <div className="comment-header">
            <span>全部评论（{detail.comm_count}）</span>
            <span>{detail.like_count} 点赞</span>
          </div>
          {detail.comm_count === 0 ? (
            <NoneComment></NoneComment>
          ) : (
            <div className="comment-list">
              {/* 评论列表 */}
              {commentList.map(item => (
                <CommentItem {...item} key={item.com_id} />
              ))}
              {/* 无限加载组件 */}
              <InfiniteScroll hasMore={hasMore} loadMore={loadMore} />
            </div>
          )}
        </div>
      </div>
    )
  }

  // 渲染对文章评论的弹层
  const renderComment = () => {
    return (
      <Popup onMaskClick={closeComment} visible={showComment} position="bottom">
        <CommentInput addComment={addComment}></CommentInput>
      </Popup>
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
        <CommentFooter openComment={openComment} goComment={goComment} />
      </div>
      {/* 对文章评论弹层 */}
      {renderComment()}
    </div>
  )
}

export default Article
