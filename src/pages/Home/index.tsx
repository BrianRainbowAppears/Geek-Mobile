import Icon from '@/components/Icon'
import { getUserChannelAction } from '@/store/actions/home'
// import { homeReducer } from '@/store/reducers/home'
import { Popup, Tabs } from 'antd-mobile'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useInitState } from '../hooks'
// 导入弹层内容组件
import Channels from './components/Channels'
import ArticleList from './components/ArticleList'

import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'

const Home = () => {
  const { userChannel, active } = useInitState(getUserChannelAction, 'homeReducer')
  // console.log(userChannel)
  // 2. 频道管理
  const [show, setShow] = useState(false)
  // 打开频道管理弹层方法
  const openChannel = () => {
    setShow(true)
  }
  // 关闭频道管理弹层方法
  const closeChannel = () => {
    setShow(false)
  }
  // 3. 手动点击控制选中
  const dispatch = useDispatch()
  const changeActive = (id: string) => {
    // 因为不需要异步action，所以在这里直接分发dispatch保存id为当前active值到redux中
    // 1. 存储当前点击的频道ID
    dispatch({ type: 'changeActive/home', payload: parseInt(id) })
  }
  // 4. 搜索功能
  const history = useHistory()
  const onSearch = () => {
    history.push('/search')
  }

  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      {/* // 注意：此处别忘了添加 tabs 类名 */}
      {/* activeLineMode 控制高亮下划线展示样式 */}
      {userChannel.length > 0 && (
        <Tabs onChange={changeActive} activeKey={active + ''} className="tabs" activeLineMode="auto">
          {/* Tabs.Tab 展示页签的内容 */}
          {userChannel.map((item, i) => (
            <Tabs.Tab title={item.name} key={item.id}>
              {/* {'推荐频道的内容' + i} */}
              <ArticleList channelId={item.id}></ArticleList>
            </Tabs.Tab>
          ))}
        </Tabs>
      )}
      {/* 右侧按钮：1. 搜索 2. 频道管理 */}
      <div className="tabs-opration">
        <Icon onClick={onSearch} type="iconbtn_search" />
        <Icon onClick={openChannel} type="iconbtn_channel" />
      </div>

      {/* 管理频道的弹层 */}
      <Popup onMaskClick={closeChannel} className="channel-popup" visible={show}>
        <Channels closeChannel={closeChannel}></Channels>
      </Popup>
    </div>
  )
}

export default Home
