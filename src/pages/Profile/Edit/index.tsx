import { useInitState } from '@/pages/hooks'
import { getEditUserAction } from '@/store/actions/profile'
// import { RootState } from '@/types/store'
import { Button, List, DatePicker, NavBar } from 'antd-mobile'
import classNames from 'classnames'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

import styles from './index.module.scss'

const Item = List.Item

const ProfileEdit = () => {
  // const dispatch = useDispatch()
  // // 1. 获取编辑页面个人信息数据
  // useEffect(() => {
  //   dispatch<any>(getEditUserAction())
  // }, [dispatch])
  // // 2. 从Redux中拿取数据进行渲染
  // const { user } = useSelector((state: RootState) => state.getUserInfoReducer)

  // 以上代码使用自定义Hook useInitState可简化为：（传入两个参数）
  const {user} = useInitState(getEditUserAction, 'getUserInfoReducer')
  const { photo, name, gender, birthday, intro } = user
  console.log(user)

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
            <Item arrow extra={name || '黑马先锋'}>
              昵称
            </Item>
            <Item arrow extra={<span className={classNames('intro', 'normal')}>{intro || '未填写'}</span>}>
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={gender === '0' ? '男' : '女'}>
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
    </div>
  )
}

export default ProfileEdit
