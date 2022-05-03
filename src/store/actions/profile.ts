import { User } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import request from '@/utils/request'

// 定义接口请求返回数据的数据类型
type UserResponse = {
  message: string
  data: User
}

export const getUserInfoAction = (): RootThunkAction => {
  return async (dispatch, getState) => {
    const ret: UserResponse = await request.get('/user')
    console.log('获取的个人信息数据：', ret.data)
    // 在store.d.ts顶一万action的type类型后，回到此处进行dispatch把数据存储到Redux就会有代码提示
    dispatch({ type: 'profile/userInfo', payload: ret.data })
  }
}
