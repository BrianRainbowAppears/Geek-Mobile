import { Button } from 'antd-mobile'
import './index.scss'

function Test() {
  return (
    <div>
      {/* 测试组件库 */}
      <div className="cp">
        <Button color="primary">Primary</Button>
        <Button color="success">Success</Button>
      </div>
      <div className='vcss'>
        <p className='mainColor'>css变量使用</p>
        <p>局部样式</p>
      </div>
    </div>
  )
}

export default Test
