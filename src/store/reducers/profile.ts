import { EditProfile, User } from '@/types/data'
import { getUserInfoAction } from '@/types/store'

type ProfileType = {
  user: User,
  edit: EditProfile
}
// 添加类型断言，直接在initialState后添加类型会报错
const initialState = {
  user: {},
  edit: {}
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
  } else if (action.type === 'profile/edit') {
    // 编辑页面个人数据
    return {
      ...state,
      edit: action.payload
    }
  } else if (action.type === 'profile/update') {
    // 局部更新修改Redux中的用户信息
    return {
      ...state,
      // 新状态
      edit: {
        ...state.edit,
        // 替换之前修改的信息
        ...action.payload
      }
    }
  }
  return state
}
