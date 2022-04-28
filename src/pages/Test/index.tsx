import { Button } from 'antd-mobile'
import './index.scss'
import Icon from '@/components/Icon'

function Test() {
  return (
    <div>
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
      <Icon onClick={() => {
        console.log('123')
      }} type="#iconbtn_qa_sel" className='iconFix'></Icon>
    </div>
  )
}

export default Test
