import { Input, NavBar, TextArea } from 'antd-mobile'
import { useEffect, useState } from 'react'

import styles from './index.module.scss'
import { InputPopup } from '@/pages/Profile/Edit'

// 定义父组件传来的数据类型
type Props = {
  // 区分弹层
  // type: '' | 'name' | 'intro'
  // InputPopup['type'] 获取对象中type属性的类型
  type: InputPopup['type']
  value: string
  hidePop: () => void
  name: string
  onUpdateName: (type: string,newName: string, onClose: () => void) => void
}
// 给传入的Props进行解构，并赋予类型
const EditInput = ({ hidePop, name, onUpdateName, type, value }: Props) => {
  const [val, setVal] = useState(value)
  const onSave = () => {
    if (type === '') return 
    // 修改的是昵称还是简介 => 通过type告诉父组件修改的属性是什么
    onUpdateName(type, val,hidePop )
  }
  const isName = type === 'name'
  // 监听value的变化，value变化重新更新val的值，能够防止复用该弹窗的昵称和简介修改相互影响
  useEffect(() => {
    setVal(value ?? '')
  }, [value])
  return (
    <div className={styles.root}>
      {/* NavBar的onBack方法就是弹窗的关闭方法 */}
      <NavBar
        onBack={hidePop}
        className="navbar"
        right={
          <span onClick={onSave} className="commit-btn">
            提交
          </span>
        }
      >
        编辑{isName ? '昵称' : '简介'}
      </NavBar>

      <div className="edit-input-content">
        <h3>{isName ? '昵称' : '简介'}</h3>

        {isName ? (
          <div className="input-wrap">
            {/* 接收父传子的昵称数据进行渲染 */}
            {/* 这里使用组件受控，实现双向绑定 */}
            <Input value={val} onChange={setVal} placeholder="请输入" />
          </div>
        ) : (
          <TextArea
            className="textarea"
            placeholder="请输入"
            // 展示：右下角的字数统计
            showCount
            // 指定内容最大长度
            maxLength={100}
            // 指定 文本域 展示内容的行数（文本域高度）
            rows={4}
            value={val}
            onChange={setVal}
          />
        )}
      </div>
    </div>
  )
}

export default EditInput
