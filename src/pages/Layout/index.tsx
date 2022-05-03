import { Route, useHistory, useLocation } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import styles from './index.module.scss'

import Icon from '@/components/Icon'

// 导入页面组件，配置路由
import Home from '../Home'
import Question from '../Question'
import Video from '../Video'
import Profile from '../Profile'

const tabs = [
  { path: '/home', icon: 'iconbtn_home', text: '首页' },
  { path: '/home/question', icon: 'iconbtn_qa', text: '问答' },
  { path: '/home/video', icon: 'iconbtn_video', text: '视频' },
  { path: '/home/profile', icon: 'iconbtn_mine', text: '我的' }
]

const Layout = () => {
  const history = useHistory()
  const location = useLocation()

  const pageSwitch = (key: string) => {
    console.log(key)
    history.push(key)
  }
  return (
    <div className={styles.root}>
      {/* 想要实现进入layout页面默认显示Home组件，只需要将子组件路径与父组件路径保持一致即可实现，但是需要加exact属性，避免其他组件也会根据/home路径进行加载，不需要使用重定向，我们再工作中也需要避免多次使用重定向 */}
      <Route exact path="/home">
        <Home></Home>
      </Route>
      <Route path="/home/question">
        <Question></Question>
      </Route>
      <Route path="/home/video">
        <Video></Video>
      </Route>
      <Route path="/home/profile">
        <Profile></Profile>
      </Route>

      <TabBar
        className="tab-bar"
        activeKey={location.pathname}
        onChange={key => {
          pageSwitch(key)
        }}
      >
        {tabs.map(item => (
          <TabBar.Item
            key={item.path}
            icon={active => <Icon type={active ? `${item.icon}_sel` : item.icon} className="tab-bar-item-icon" />}
            title={item.text}
          />
        ))}
      </TabBar>
    </div>
  )
}

export default Layout
