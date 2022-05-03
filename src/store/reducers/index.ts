import { combineReducers } from 'redux'
import { loginReducer } from './login'
import { getUserInfoReducer } from './profile'
// 合并多个模块的数据
const rootReducer = combineReducers({
  loginReducer,
  getUserInfoReducer
})
export default rootReducer
