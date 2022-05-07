import { useHistory } from 'react-router-dom'
import { NavBar } from 'antd-mobile'

import ArticleItem from '@/components/ArticleItem'

import styles from './index.module.scss'

const Result = () => {
  // 根据搜索页面跳转携带的关键词，查询接口，获取搜索结果的列表

  const history = useHistory()
  // 渲染搜索结果列表
  const renderArticleList = () => {
    return [].map((item, index) => {
      return (
        <div
          key={index}
          className="article-item"
          onClick={() => history.push(`/article/${1}`)}>
          <ArticleItem type={1} item={item} />
        </div>
      )
    })
  }

  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}>搜索结果</NavBar>
      {/* 搜索结果的新闻列表 */}
      <div className="article-list">{renderArticleList()}</div>
    </div>
  )
}

export default Result
