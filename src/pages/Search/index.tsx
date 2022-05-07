import classnames from 'classnames'
import { useHistory } from 'react-router'
import { NavBar, SearchBar } from 'antd-mobile'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useState } from 'react'
import { getSuggestion } from '@/api/search'
// import { debounce } from 'lodash'
import { useDebounceFn } from 'ahooks'

// 搜索联想防抖：
// 方案一：使用lodash的debounce方法进行防抖处理
// 参数1：传入延迟执行的回调函数
// 参数2：延迟执行的时间
// 返回值：经过防抖处理之后的可执行函数=>在需要防抖处理的位置进行调用
// const debounceFn = debounce(async (val: string) => {
//   //查询=>放置避免多次执行的代码
//   const { data } = await getSuggestion({ q: val })
//   console.log(data)
// }, 500)

const SearchPage = () => {
  const history = useHistory()
  // 1. 处理搜索输入框的受控（双向绑定） = value(绑定状态) + onChange(修改状态，驱动视图刷新)
  const [keyword, setKeyword] = useState('')
  const [suggestList, setSuggestList] = useState<string[]>([])
  // 2. 方案二：对联想词进行防抖处理
  const { run } = useDebounceFn(
    async (val: string) => {
      //查询=>放置避免多次执行的代码
      const { data } = await getSuggestion({ q: val })
      console.log(data)
      setSuggestList(data.options)
    },
    {
      wait: 600
    }
  )
  const changeKeyword = async (val: string) => {
    console.log('输入框输入的值：', val)
    setKeyword(val)
    // 需求：根据当前输入，查询匹配到的联想词列表
    // 问题：一旦输入发生变化就会发送请求，频率很高
    // 1. 影响前端的渲染性能
    // 2. 服务器压力大
    // 解决：前端进行节流防抖=>防抖（setTimeout）
    try {
      // 非空判断  并清空联想词
      if (!val.trim()) return setSuggestList([])
      // //查询
      // const { data } = await getSuggestion({ q: val })
      // console.log(data)
      // 防抖处理后的函数：
      // 方案一：
      // debounceFn(val)
      // 方案二：
      run(val)
    } catch (error) {}
  }

  return (
    <div className={styles.root}>
      <NavBar className="navbar" onBack={() => history.go(-1)} right={<span className="search-text">搜索</span>}>
        {/* value和onChange实现表单受控 */}
        <SearchBar onChange={changeKeyword} value={keyword} placeholder="请输入关键字搜索" />
      </NavBar>
      {/* 搜索历史记录 */}
      {true && (
        <div
          className="history"
          style={{
            display: true ? 'none' : 'block'
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            <span className="history-item">
              <span className="text-overflow">黑马程序员</span>
              <Icon type="iconbtn_essay_close" />
            </span>
          </div>
        </div>
      )}
      {/* 搜索联想词列表 */}
      <div className={classnames('search-result', suggestList.length ? 'show' : '')}>
        {suggestList.map((item, i) => (
          <div key={i} className="result-item">
            <Icon className="icon-search" type="iconbtn_search" />
            <div className="result-value text-overflow">
              {/* <span>黑马</span> */}
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
