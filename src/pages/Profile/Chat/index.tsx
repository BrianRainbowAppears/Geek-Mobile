import { Input, NavBar } from 'antd-mobile'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { io, Socket } from 'socket.io-client'
import { RootState } from '@/types/store'

type ChatItem = {
  type: 'xz' | 'my' // xz代表小智，my代表用户
  msg: string // 聊天内容
}

const Chat = () => {
  const history = useHistory()
  const { token } = useSelector((state: RootState) => state.loginReducer)
  // 用户聊天发送的内容 => 受控组件
  const [msg, setMsg] = useState('')
  // 使用ref存储io实例 => 全局
  const socketIo = useRef<Socket>()
  // 聊天列表数据
  const [list, setList] = useState<ChatItem[]>([])

  // 1. 建立websocket双向通信的连接
  useEffect(() => {
    // 组件挂载后建立
    socketIo.current = io('http://toutiao.itheima.net', {
      // 建立连接携带参数给后台
      query: {
        token: token
      },
      // 指定连接方式为websocket
      transports: ['websocket']
    })
    // 通过监听connect事件，判断连接是否建立成功
    socketIo.current.on('connect', () => {
      console.log('连接建立成功')
      setList([
        {
          type: 'xz',
          msg: '你好，我是小智'
        }
      ])
    })
    // 2. 接收服务器发送给浏览器的消息 => 事件名是后台提供的
    socketIo.current.on('message', data => {
      console.log('接收服务器的消息：', data)
      // 把小智回复的消息显示到列表
      setList(l => [
        ...l,
        {
          type: 'xz',
          msg: data.msg
        }
      ])
    })
  }, [token])

  // 1. 浏览器向服务器发消息
  const sendMsg = () => {
    if (!msg.trim()) return
    socketIo.current?.emit('message', {
      msg, // 发送的消息内容
      timestamp: Date.now() // 当前时间戳
    })
    // 2. 列表中显示发送的消息
    setList([
      ...list,
      {
        type: 'my',
        msg
      }
    ])
    // 清空输入的msg
    setMsg('')
  }

  // 监听聊天列表状态变化 => 执行滚动到底部 => 避免聊天内容被遮盖
  const scrollBoxRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // list发生变化就会执行
    // 思路：
    // 1. 确定滚动区域盒子：聊天列表chat-list盒子 => 获取滚动盒子的DOM对象
    // 2. 获取滚动高度 => 滚动盒子DOM对象.scrollHeight
    // 3. 执行滚动 => 滚动盒子DOM对象.scrollTo({top: top})
    const scrollBox = scrollBoxRef.current
    scrollBox?.scrollTo({
      top: scrollBox.scrollHeight,
      behavior: 'smooth'
    })
  }, [list])

  return (
    <div className={styles.root}>
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        小智同学
      </NavBar>

      <div ref={scrollBoxRef} className="chat-list">
        {list.map((item, i) => (
          <div key={i} className={classnames('chat-item', item.type === 'xz' ? 'self' : 'user')}>
            {item.type === 'xz' ? (
              <Icon type="iconbtn_xiaozhitongxue" />
            ) : (
              <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
            )}
            <div className="message">{item.msg}</div>
          </div>
        ))}
      </div>

      <div className="input-footer">
        <Input
          value={msg}
          onChange={setMsg}
          onEnterPress={sendMsg}
          className="no-border"
          placeholder="请描述您的问题"
        />
        <Icon type="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
