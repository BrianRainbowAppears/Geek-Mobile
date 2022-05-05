import classnames from 'classnames'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import { useInitState } from '@/pages/hooks'
import { addChannelAction, delChannelAction, getAllChannelAction } from '@/store/actions/home'
import { useState } from 'react'
// import { channel } from 'diagnostics_channel'
import { Toast } from 'antd-mobile'
import { Channel } from '@/types/data'

// 接收父组件的传值
type Props = {
  closeChannel: () => void
}
const Channels = ({ closeChannel }: Props) => {
  // 1. 获取用户频道数据
  const { userChannel } = useSelector((state: RootState) => state.homeReducer)
  // 2. 获取频道推荐数据
  const { restChannel, active } = useInitState(getAllChannelAction, 'homeReducer')
  // 3. 用户频道编辑状态切换
  const [isEdit, setEdit] = useState(false)
  // 切换编辑状态方法
  const changeEdit = () => {
    // 触发即取反，进行切换操作
    setEdit(!isEdit)
  }
  // 4. 点击高亮 | 删除点击频道（复用）
  const dispatch = useDispatch()
  const changeActive = (channel: Channel) => {
    if (!isEdit) {
      // 非修改状态 => 执行点击高亮的代码
      // 因为不需要异步action，所以在这里直接分发dispatch保存id为当前active值到redux中
      // 1. 存储当前点击的频道ID
      dispatch({ type: 'changeActive/home', payload: channel.id })
      // 2. 关闭弹窗 =》 和首页切换会联动
      closeChannel()
      return
    }
    // =======修改状态 => 执行频道的删除
    // console.log('删除');
    // 满足以下条件：
    // 1. 删除id不能为0（推荐频道）
    // 2. 当前选中频道不能删
    // 3. 至少保留4个频道
    if (channel.id === 0 || channel.id === active || userChannel.length <= 4) {
      return Toast.show({ content: '不满足删除条件' })
    }
    // 执行删除
    dispatch<any>(delChannelAction(channel))
  }
  // 5. 点击添加频道 
  const addChannel = (channel: Channel) => {
    if (!isEdit) {
      return Toast.show({content: '当前不是编辑状态'})
    }
    console.log(channel.name);
    dispatch<any>(addChannelAction(channel))
  } 

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon onClick={closeChannel} type="iconbtn_channel_close" />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        {/* 用户频道数据 */}
        <div className={classnames('channel-item', isEdit && 'edit')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击进入频道</span>
            <span onClick={changeEdit} className="channel-item-edit">
              {isEdit ? '保存' : '编辑'}
            </span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {userChannel.map(item => (
              <span
                onClick={() => {
                  changeActive(item)
                }}
                key={item.id}
                className={classnames('channel-list-item', active === item.id ? 'selected' : '')}
              >
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
              <span
                onClick={() => {
                  addChannel(item)
                }}
                key={item.id}
                className="channel-list-item"
              >
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
