import { SelType } from '../..'
import styles from './index.module.scss'

type Props = {
  // 区分弹层作用
  type: SelType['type'],
  // 关闭弹窗方法
  closeModal: () => void,
  onUpdateName:(
    type: string,
    newName: string | number,
    onClose: () => void
  ) => void
}
// 性别选项数据
const GenderList = [
  { name: '男', value: 0 },
  { name: '女', value: 1 },
]
// 头像修改的选项数据
const photoList = [
  { name: '拍照', value: 'picture' },
  { name: '本地选择', value: 'local' },
]

const EditList = ({type, closeModal, onUpdateName} : Props) => {
  const list = type === 'gender' ? GenderList : photoList
  return (
    <div className={styles.root}>
      {
        list.map(item => (
          <div onClick={() => {
            onUpdateName(type, item.value, closeModal)
          }} key={item.value} className="list-item">{item.name}</div>
        ))
      }

      {/* <div className="list-item">男</div>
      <div className="list-item">女</div> */}

      <div onClick={closeModal} className="list-item">取消</div>
    </div>
  )
}

export default EditList
