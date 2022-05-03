import { User } from '@/types/data'
import { getUserInfoAction } from '@/types/store'

type ProfileType = {
  user: User
}
// 添加类型断言，直接在initialState后添加类型会报错
const initialState = {
  user: {}
} as ProfileType

// 刚开始创建action可以给予unknown类型，既不会报错了
// 定义完action 和 action类型后，可以将action重新给予action的type类型
export const getUserInfoReducer = (state = initialState, action: getUserInfoAction) => {
  if (action.type === 'profile/userInfo') {
    return {
      // 基于不改变原数据的原则，解构state，将传入的payload进行覆盖
      ...state,
      user: action.payload
    }
  }
  return state
}
