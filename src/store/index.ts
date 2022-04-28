// 创建store
import { createStore, applyMiddleware } from 'redux'
// 1. 调式Redux数据
import { composeWithDevTools } from 'redux-devtools-extension'
// 2. 处理异步action 
import thunk from 'redux-thunk'
// 合并reducer 
import reducer from './reducers'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export default store
