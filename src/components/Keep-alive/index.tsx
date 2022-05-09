// 路由缓存组件

import { ReactNode } from 'react'
import { Route, RouteProps } from 'react-router-dom'

// // 使用：
// {
//   /* <KeepAlive exact path="/home">
// 被缓存组件
// <Layout />
// </KeepAlive> */
// }

function KeepAlive({ children, ...rest }: RouteProps & { children: ReactNode }) {
  return (
    <Route
      // path="/keep"
      {...rest}
      children={props => {
        // == 这里返回的组件会被缓存 ==
        // 问题：虽然被缓存了，但是会一直显示？
        // 解决：通过 props.match 控制是否显示=》props.match !== null 说明匹配到当前路径，显示children中组件
        console.log('是否被匹配：', props.match)
        return (
          <div
            style={{
              height: '100%',
              display: props.match ? 'block' : 'none'
            }}
          >
            {children}
          </div>
        )
      }}
    />
  )
}

export default KeepAlive
