import Icon from '@/components/Icon'
import { useParams } from 'react-router-dom'
import styles from './index.module.scss'

type Props = {
  // normal 普通评论
  // reply 回复评论
  type?: 'normal' | 'reply'
  goComment: () => void
  openComment: () => void
  onCollected: (artId: string) => void
  isCollected: boolean
  onLiked: () => void
  attitude: number
}

const CommentFooter = ({
  type = 'normal',
  goComment,
  openComment,
  onCollected,
  isCollected,
  onLiked,
  attitude
}: Props) => {
  const { artId } = useParams<{ artId: string }>()
  // console.log('收藏的文章ID：', artId)

  return (
    <div className={styles.root}>
      <div onClick={openComment} className="input-btn">
        <Icon type="iconbianji" />
        <span>抢沙发</span>
      </div>

      {type === 'normal' && (
        <>
          <div onClick={goComment} className="action-item">
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {!!1 && <span className="bage">{1}</span>}
          </div>
          <div onClick={onLiked} className="action-item">
            <Icon type={attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            <p>点赞</p>
          </div>
          <div
            onClick={() => {
              onCollected(artId)
            }}
            className="action-item"
          >
            <Icon type={isCollected ? 'iconbtn_collect_sel' : 'iconbtn_collect'} />
            <p>收藏</p>
          </div>
        </>
      )}

      {type === 'reply' && (
        <div onClick={onLiked} className="action-item">
          <Icon type={attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
          <p>点赞</p>
        </div>
      )}

      <div className="action-item">
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  )
}

export default CommentFooter
