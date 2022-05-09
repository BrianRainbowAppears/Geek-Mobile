import './App.scss'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
// 导入页面
import Login from '@/pages/Login'
import Layout from './pages/Layout'
import NotFound from './pages/NotFound'
import Test from './pages/Test'
import Edit from '@/pages/Profile/Edit'
import ArticleDetail from '@/pages/Home/components/ArticleDetail'
import Search from '@/pages/Search'
import Chat from '@/pages/Profile/Chat'
import SearchResult from '@/pages/Search/Result'
import customHistory from './utils/history'
import { AuthRoute } from './components/AuthRoute'

function App() {
  return (
    //{/* 配置路由 */}
    <Router history={customHistory}>
      <div className="app">
        <Switch>
          <Redirect exact from="/" to="/home"></Redirect>
          <Route path="/login" component={Login}></Route>
          <Route path="/home" component={Layout}></Route>
          <Route path="/chat" component={Chat}></Route>
          <Route path="/test" component={Test}></Route>
          <Route path="/article/:artId">
            <ArticleDetail></ArticleDetail>
          </Route>
          <Route exact path="/search" component={Search}></Route>
          <Route path="/search/result" component={SearchResult}></Route>
          {/* 路由在哪显示就写到哪，该页面时单独页面，修改页面不属于layout模块。所以只能写到一级路由 */}
          <AuthRoute path="/profile/edit">
            <Edit></Edit>
          </AuthRoute>
          {/* 兜底404 */}
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
