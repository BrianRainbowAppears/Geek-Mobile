import './App.scss'
import { BrowserRouter, Redirect, Route, Router, Switch } from 'react-router-dom'
// 导入页面
import Login from '@/pages/Login'
import Layout from './pages/Layout'
import NotFound from './pages/NotFound'
import Test from './pages/Test'
import customHistory from './utils/history'

function App() {
  return (
    //{/* 配置路由 */}
    <Router history={customHistory}>
      <div className="app">
        <Switch>
          <Redirect exact from='/' to='/home'></Redirect>
          <Route path="/login" component={Login}></Route>
          <Route path="/home" component={Layout}></Route>
          <Route path="/test" component={Test}></Route>
          {/* 兜底404 */}
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
