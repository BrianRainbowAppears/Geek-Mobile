// 目的：能在JS中拿到路由实例对象，就能在JS文件中实现路由跳转，不然只能在函数组件.jsx/tsx中实现跳转
// 导入创建自定义 history 函数
import { createBrowserHistory } from 'history'

// 创建自定义history
const customHistory = createBrowserHistory()

export default customHistory