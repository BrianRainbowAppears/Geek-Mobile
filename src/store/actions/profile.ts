import { EditProfile, ResponseEdit, ResponseUser } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import request from '@/utils/request'

// 定义接口请求返回数据的数据类型（之后被泛型工具函数替代，提高复用性）
// type UserResponse = {
//   message: string
//   data: User
// }

// 获取个人信息页面数据
export const getUserInfoAction = (): RootThunkAction => {
  return async (dispatch, getState) => {
    const ret: ResponseUser = await request.get('/user')
    console.log('获取的个人信息数据：', ret.data)
    // 在store.d.ts顶一万action的type类型后，回到此处进行dispatch把数据存储到Redux就会有代码提示
    dispatch({ type: 'profile/userInfo', payload: ret.data })
  }
}
// 获取个人信息编辑页面数据
export const getEditUserAction = (): RootThunkAction => {
  return async (dispatch, getState) => {
    const ret: ResponseEdit = await request.get('/user/profile')
    console.log('编辑页面数据：', ret.data)
    // 存储到Redux
    dispatch({ type: 'profile/edit', payload: ret.data })
  }
}
// 修改昵称
export const updateUserName = (user: Partial<EditProfile>):RootThunkAction => {
  return async(dispatch,getState)=>{
    await request.patch('/user/profile', user)
    // 分发action局部更新Redux，避免全局更新，提高效率
    dispatch({ type:'profile/update' , payload: user})
  }
}
