import { Input, NavBar } from 'antd-mobile'

import styles from './index.module.scss'

// 定义父组件传来的数据类型
type Props = {
  hidePop: () => void,
  name: string
}
// 给传入的Props进行解构，并赋予类型
const EditInput = ({ hidePop, name }: Props) => {
  return (
    <div className={styles.root}>
      {/* NavBar的onBack方法就是弹窗的关闭方法 */}
      <NavBar onBack={hidePop} className="navbar" right={<span className="commit-btn">提交</span>}>
        编辑昵称
      </NavBar>

      <div className="edit-input-content">
        <h3>昵称</h3>

        <div className="input-wrap">
          {/* 接收父传子的昵称数据进行渲染 */}
          <Input value={name} placeholder="请输入" />
        </div>
      </div>
    </div>
  )
}

export default EditInput
