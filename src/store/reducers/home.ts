import { Channel } from '@/types/data'
import { HomeAction } from '@/types/store'

type HomeState = {
  userChannel: Channel[],
  restChannel: Channel[]
}
const initialState: HomeState = {
  userChannel: [],
  restChannel: []
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
      restChannel:action.payload
    }
  }

  return state
}
