// Redux 相关类型
import { ThunkAction } from 'redux-thunk'
import store from '../store'
import { User } from './data'
// Redux中store数据的类型
export type RootState = ReturnType<typeof store.getState>
// Redux中所有action的类型
type RootAction = loginAction | getUserInfoAction
// Redux异步action返回值的类型
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>

// 相关模块的action类型：login home 等..
export type loginAction = {
  type: 'login/token'
  payload: token
}
export type getUserInfoAction = {
  type: 'profile/userInfo',
  payload: User
}
