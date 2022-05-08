import { Button } from 'antd-mobile'
import './index.scss'
import Icon from '@/components/Icon'
import { differenceBy } from 'lodash'
// 对xss进行消杀的库
import DOMPurify from 'dompurify'
// 页面中代码块高亮
import hljs from 'highlight.js'
// 代码高亮的主题
import 'highlight.js/styles/dark.css'
import { useEffect } from 'react'
import { useHighLightCode } from '../hooks'

function Test() {
  // 原生方式：
  var all = [1, 3, 5, 7]
  var my = [1, 7]
  // 最终希望拿到：[3, 5]
  const afterAll = all.filter(allItem => my.findIndex(myItem => myItem === allItem) < 0)
  console.log(afterAll)
  // 使用lodash插件方法：
  // 参数一：传入所有数据
  // 参数二：传入要减去的数据
  // 参数三：传入判断item是否相同的标识属性 => id
  console.log(differenceBy(all, my))

  // xss共计：跨站脚本攻击
  // const html1 = '<div><script>alert(1)</script><h1>xss攻击</h1></div>'
  const html2 = '<div onclick="alert(1)"><h1>xss攻击</h1></div>'
  // 怎么解决：
  const safeHtml1 = DOMPurify.sanitize(html2)
  console.log('安全的html字符串：', safeHtml1)
  // 代码高亮
  // useEffect(() => {
  //   // 忽略警告
  //   hljs.configure({
  //     ignoreUnescapedHTML: true
  //   })
  //   document.querySelectorAll<HTMLElement>('pre code').forEach(el => {
  //     hljs.highlightElement(el)
  //   })
  // }, [])
  useHighLightCode()

  return (
    <div>
      {/* 代码块高亮 */}
      <pre>
        <code> import React from 'react'</code>
        <code>console log (React)</code>
      </pre>

      {/* xss  */}
      <div className="xss" dangerouslySetInnerHTML={{ __html: html2 }}></div>

      {/* 测试组件库 */}
      <div className="cp">
        <Button color="primary">Primary</Button>
        <Button color="success">Success</Button>
      </div>
      <div className="vcss">
        <p className="mainColor">css变量使用</p>
        <p>局部样式</p>
      </div>
      {/* 测试1px边框问题 */}
      <div className="borderTest1"></div>
      <div className="borderTest2"></div>
      {/* 测试字体图标 */}
      <svg className="icon" aria-hidden="true">
        {/* 使用时，只需要将此处的 iconbtn_like_sel 替换为 icon 的名称即可*/}
        <use xlinkHref="#iconbtn_like_sel"></use>
      </svg>
      <svg className="icon" aria-hidden="true">
        {/* 使用时，只需要将此处的 iconbtn_like_sel 替换为 icon 的名称即可*/}
        <use xlinkHref="#iconbtn_like_sel"></use>
      </svg>
      {/* 经过封装的Icon图标组件 提高Icon复用性和封装性 方便调用 */}
      <Icon
        onClick={() => {
          console.log('123')
        }}
        type="iconbtn_qa_sel"
        className="iconFix"
      ></Icon>
    </div>
  )
}

export default Test
