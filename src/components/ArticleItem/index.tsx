import classnames from 'classnames'

import Icon from '@/components/Icon'

import styles from './index.module.scss'
import { ArticlesItem } from '@/types/data'
import { useHistory } from 'react-router-dom'
import { relTime } from '@/utils/utils'

type Props = {
  /**
   * 0 表示无图
   * 1 表示单图
   * 3 表示三图
   */
  type: 0 | 1 | 3
  item: ArticlesItem
}

const ArticleItem = ({ type, item }: Props) => {
  // if (item.cover.type !== 0) {
  //   console.log(item);
  // }
  // 跳转讯息详情页
  const history = useHistory()
  const intoDetailPage = (id: string) => {
    console.log(id)
    history.push(`/article/${id}`)
  }

  return (
    <div
      onClick={() => {
        intoDetailPage(item.art_id)
      }}
      className={styles.root}
    >
      <div className={classnames('article-content', type === 3 && 't3', type === 0 && 'none-mt')}>
        <h3>{item.title}</h3>
        {/* 判断封面cover的type类型是否为0，不为0才展示图片，否则不展示 */}
        {item.cover.type !== 0 && (
          <div className="article-imgs">
            <div className="article-img-wrapper">
              <img
                src={item.cover.images[0]}
                // src="http://geek.itheima.net/resources/images/63.jpg"
                alt=""
              />
            </div>
            {/* {item.cover.images.map((img, i) => (
              <div key={i} className="article-img-wrapper">
                <img
                  src={img}
                  // src="http://geek.itheima.net/resources/images/63.jpg"
                  alt=""
                />
              </div>
            ))} */}
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 && 'none-mt')}>
        <span>{item.aut_name}</span>
        <span>{item.comm_count} 评论</span>
        <span>{relTime(item.pubdate)}</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
