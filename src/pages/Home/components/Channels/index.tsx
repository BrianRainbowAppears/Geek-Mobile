import classnames from 'classnames'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import { useInitState } from '@/pages/hooks'
import { getAllChannelAction } from '@/store/actions/home'

// 接收父组件的传值
type Props = {
  closeChannel: () => void
}
const Channels = ({ closeChannel }: Props) => {
  // 1. 获取用户频道数据
  const { userChannel } = useSelector((state: RootState) => state.homeReducer)
  // 2. 获取频道推荐数据
  const { restChannel } = useInitState(getAllChannelAction, 'homeReducer')

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon onClick={closeChannel} type="iconbtn_channel_close" />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        {/* 用户频道数据 */}
        <div className={classnames('channel-item')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击进入频道</span>
            <span className="channel-item-edit">编辑</span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {userChannel.map(item => (
              <span key={item.id} className={classnames('channel-list-item')}>
                {item.name}
                <Icon type="iconbtn_tag_close" />
              </span>
            ))}
          </div>
        </div>

        {/* 可选频道：可以加入到用户频道的数据 */}
        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {restChannel.map(item => (
              <span key={item.id} className="channel-list-item">
                + {item.name}
              </span>
            ))}
            {/* <span className="channel-list-item">+ HTML</span> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
