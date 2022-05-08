// import dayjs from 'dayjs'
// import classnames from 'classnames'

import Icon from '@/components/Icon'
import { ArticleCommentItem } from '@/types/data'
import { formatTime } from '@/utils/utils'

import styles from './index.module.scss'

type Props = {
  // normal 普通 - 文章的评论
  type?: 'normal'
} & ArticleCommentItem

const CommentItem = ({
  // normal 普通
  type = 'normal',
  aut_photo,
  aut_name,
  like_count,
  is_followed,
  is_liking,
  content,
  reply_count,
  pubdate
}: Props) => {
  return (
    <div className={styles.root}>
      {/* 评论人头像 */}
      <div className="avatar">
        <img src={aut_photo} alt="" />
      </div>
      <div className="comment-info">
        <div className="comment-info-header">
          {/* 评论人 */}
          <span className="name">{aut_name}</span>
          {/* 文章评论-点赞 */}
          <span className="thumbs-up">
            {like_count}
            <Icon type={is_liking ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
          </span>
        </div>
        {/* 评论内容 */}
        <div className="comment-content">{content}</div>
        <div className="comment-footer">
          <span className="replay">
            {reply_count} 回复
            <Icon type="iconbtn_right" />
          </span>
          <span className="comment-time">{formatTime(pubdate)}</span>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
