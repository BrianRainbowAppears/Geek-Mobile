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

  return state
}
