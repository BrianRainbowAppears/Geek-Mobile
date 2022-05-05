// import { UserChannel } from './../../types/data.d';
import { Channel } from '@/types/data'
import { HomeAction } from '@/types/store'

type HomeState = {
  userChannel: Channel[]
  restChannel: Channel[]
  active: number
}
const initialState: HomeState = {
  userChannel: [],
  restChannel: [],
  // 当前选中的频道id：
  active: 0
}

export const homeReducer = (state = initialState, action: HomeAction) => {
  // 用户频道数据存储
  if (action.type === 'getUserChannel/home') {
    return {
      ...state,
      userChannel: action.payload
    }
  }
  // 推荐频道数据存储
  if (action.type === 'getRestChannel/home') {
    return {
      ...state,
      restChannel: action.payload
    }
  }
  // 用户频道切换高亮
  if (action.type === 'changeActive/home') {
    return {
      ...state,
      active: action.payload
    }
  }
  // 删除频道
  if (action.type === 'delChannel/home') {
    return {
      ...state,
      // 1. 用户频道里要删除 => 当前点击频道数据
      userChannel: state.userChannel.filter(item => item.id !== action.payload.id),
      // 2. 当前点击频道数据从用户频道被删了 => 推荐频道增加被删除的频道
      restChannel: [action.payload, ...state.restChannel]
    }
  }
  // 新增频道
  if (action.type === 'addChannel/home') {
    return {
      ...state,
      userChannel: [action.payload, ...state.userChannel],
      restChannel: state.restChannel.filter(item => item.id !== action.payload.id)
    }
  }

  return state
}
