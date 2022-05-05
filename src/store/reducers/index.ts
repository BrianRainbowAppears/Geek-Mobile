import { combineReducers } from 'redux'
import { loginReducer } from './login'
import { getUserInfoReducer } from './profile'
import { homeReducer } from './home'
// 合并多个模块的数据
const rootReducer = combineReducers({
  loginReducer,
  getUserInfoReducer,
  homeReducer
})
export default rootReducer
