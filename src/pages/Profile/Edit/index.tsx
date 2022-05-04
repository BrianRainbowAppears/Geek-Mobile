import { useInitState } from '@/pages/hooks'
import { getEditUserAction, updateUserName } from '@/store/actions/profile'
// import { RootState } from '@/types/store'
import { Button, List, DatePicker, NavBar, Toast } from 'antd-mobile'
import classNames from 'classnames'
// import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// 弹层组件
import { Popup } from 'antd-mobile'
// 导入弹层内容组件
import EditInput from './components/EditInput'

import styles from './index.module.scss'
import { useState } from 'react'

const Item = List.Item
export type InputPopup = {
  type: '' | 'name' | 'intro',
  value: string,
  visible: boolean
}

const ProfileEdit = () => {
  const dispatch = useDispatch()
  // // 1. 获取编辑页面个人信息数据
  // useEffect(() => {
  //   dispatch<any>(getEditUserAction())
  // }, [dispatch])
  // // 2. 从Redux中拿取数据进行渲染
  // const { user } = useSelector((state: RootState) => state.getUserInfoReducer)

  // 以上代码使用自定义Hook useInitState可简化为：（传入两个参数）
  const { edit } = useInitState(getEditUserAction, 'getUserInfoReducer')
  console.log(edit)

  const { photo, name, gender, birthday, intro } = edit
  // console.log(user)
  // 定义visible变量
  // const [popVisible, setPopVisible] = useState(false)
  
  // 复用弹出层：需要告诉子组件，是修改昵称还是简介
  const [popVisible, setPopVisible] = useState<InputPopup>({
    type: '', // 'name' or 'intro'
    value: '', // 当前值
    visible: false // 显示或隐藏状态
  })
  // 显示弹窗方法
  const showPop = () => {
    setPopVisible({
      type: 'name',
      value: name,
      visible: true
    })
  }
  // 关闭弹窗方法
  const hidePop = () => {
    setPopVisible({
      type: '',
      value: '',
      visible: false
    })
  }
  // 简介弹出层事件
  const showIntroPop = () => {
    setPopVisible({
      type: 'intro',
      value: intro,
      visible: true
    })
  }
  // 定义修改昵称方法 =》最终要传到子组件，由子组件触发修改
  const onUpdateName = (type: string,newName: string) => {
    console.log('修改后的名字：', newName)
    // 拿到子组件修改后的名字后，分发异步action发请求进行修改数据
    // 因为需要传入定义的编辑页面数据类型一直的格式，所以需要使用这种方式传递参数{name: newName}，action中使用的Partial方法，可以使所有类型可选，所以可以任意传递
    // [type] =》根据当前打开弹层type决定修改用户的哪个属性，newName相当于修改属性对应的值，也可能对应简介，但是不想改了，懂我就行
    dispatch<any>(updateUserName({ [type]: newName }))
    Toast.show({ icon: 'success', content: '更新成功' })
  }

  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          style={{
            '--border-bottom': '1px solid #F0F0F0'
          }}
        >
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img width={24} height={24} src={photo || 'http://toutiao.itheima.net/images/user_head.jpg'} alt="" />
                </span>
              }
              arrow
            >
              头像
            </Item>
            <Item onClick={showPop} arrow extra={name || '黑马先锋'}>
              昵称
            </Item>
            <Item onClick={showIntroPop} arrow extra={<span className={classNames('intro', 'normal')}>{intro || '未填写'}</span>}>
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={gender === 0 ? '男' : '女'}>
              性别
            </Item>
            <Item arrow extra={birthday}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={false}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
          />
        </div>

        <div className="logout">
          <Button className="btn">退出登录</Button>
        </div>
      </div>
      <Popup visible={popVisible.visible} position="left">
        {/* 将弹窗关闭方法父传子，子组件通过props进行调用 */}
        <EditInput type={popVisible.type} value={popVisible.value} name={name} onUpdateName={onUpdateName} hidePop={hidePop}></EditInput>
      </Popup>
    </div>
  )
}

export default ProfileEdit
