import { isAuth } from '@/utils/token'
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom'

export const AuthRoute = ({ children, ...rest }: RouteProps) => {
  const location = useLocation()
  return (
    <Route
      {...rest}
      render={(): React.ReactNode => {
        const isLogin = isAuth()
        if (isLogin) {
          return children as React.ReactNode
          // return <Home />
        }
        // 未登录
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: location.pathname
              }
            }}
          ></Redirect>
        )
      }}
    />
  )
}
