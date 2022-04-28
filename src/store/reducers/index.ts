import { combineReducers } from 'redux'
import { loginReducer } from './login';
// 合并多个模块的数据
const rootReducer = combineReducers({
  loginReducer
})
export default rootReducer