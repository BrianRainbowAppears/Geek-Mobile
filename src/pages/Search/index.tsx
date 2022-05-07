import classnames from 'classnames'
import { useHistory } from 'react-router'
import { NavBar, SearchBar } from 'antd-mobile'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
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

// 存储搜索记录key
const recordKey = 's-record'

const SearchPage = () => {
  const history = useHistory()
  // 1. 处理搜索输入框的受控（双向绑定） = value(绑定状态) + onChange(修改状态，驱动视图刷新)
  const [keyword, setKeyword] = useState('')
  // 搜素联想词列表
  const [suggestList, setSuggestList] = useState<string[]>([])
  // 搜索的历史记录（跳转搜索才进行存储关键词）
  const [record, setRecord] = useState<string[]>(JSON.parse(localStorage.getItem(recordKey) || '[]'))

  // 存储历史记录
  const saveRecord = (keyword: string) => {
    // 排重
    if (record.some(item => item === keyword)) return
    setRecord([keyword, ...record])
  }
  // 监听record变化，发生变化本地持久化
  useEffect(() => {
    console.log('record变化了：', record)
    localStorage.setItem(recordKey, JSON.stringify(record))
  }, [record])

  // 2. 方案二：对联想词进行防抖处理
  const { run } = useDebounceFn(
    async (val: string) => {
      //查询=>放置避免多次执行的代码
      const { data } = await getSuggestion({ q: val })
      console.log(data)
      // 处理联想词高亮=>把输入的val替换为<span>val</span>
      const newList = data.options.map(item => item && item.replace(val, `<span>${val}</span>`))
      console.log('渲染之后的列表数据：', newList)
      setSuggestList(newList)
    },
    {
      wait: 600
    }
  )
  const changeKeyword = async (val: string) => {
    // console.log('输入框输入的值：', val)
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

  // 3. 跳转搜索
  const onSearch = (keyword: string) => {
    console.log('跳转搜索：', keyword)
    // 延迟跳转，解决跳转后useEffect监听不到执行的问题
    setTimeout(() => {
      history.push(`/search/result?q=${keyword}`)
    }, 0)
    // 存储搜索关键词
    saveRecord(keyword)
  }

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={
          <span
            onClick={() => {
              onSearch(keyword)
            }}
            className="search-text"
          >
            搜索
          </span>
        }
      >
        {/* value和onChange实现表单受控 */}
        <SearchBar onSearch={onSearch} onChange={changeKeyword} value={keyword} placeholder="请输入关键字搜索" />
      </NavBar>
      {/* 搜索历史记录 */}
      {suggestList.length === 0 && (
        <div
          className="history"
          style={{
            display: record.length === 0 ? 'none' : 'block'
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
            {record.map((item, i) => (
              <span key={i} className="history-item">
                <span className="text-overflow">{item}</span>
                <Icon type="iconbtn_essay_close" />
              </span>
            ))}
          </div>
        </div>
      )}
      {/* 搜索联想词列表 */}
      <div className={classnames('search-result', suggestList.length ? 'show' : '')}>
        {suggestList.map(
          (item, i) =>
            item && (
              <div
                onClick={() => {
                  onSearch(item.replace(`<span>${keyword}</span>`, keyword))
                }}
                key={i}
                className="result-item"
              >
                <Icon className="icon-search" type="iconbtn_search" />
                <div className="result-value text-overflow" dangerouslySetInnerHTML={{ __html: item }}>
                  {/* <span>黑马</span> */}
                  {/* {item} */}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default SearchPage
