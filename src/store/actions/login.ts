// import { clearToken } from "@/utils/token"
import { FormData, ResponseLogin } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import request from '@/utils/request'
import { clearToken, setToken } from '@/utils/token'

export function logoutAction() {
  return (dispatch: any) => {
    dispatch({
      type: 'clear/login'
    })
    // clearToken()
    dispatch({
      type: 'clear/user'
    })
  }
}

export const loginAction = (payload: FormData): RootThunkAction => {
  return async (dispatch, getState) => {
    const ret: ResponseLogin = await request.post('/authorizations', payload)
    console.log(ret)
    setToken(ret.data)
    dispatch({ type: 'login/token', payload: ret.data })
  }
}

export const sendCodeAction = (mobile: string): RootThunkAction => {
  return async (dispatch, getState) => {
    const ret = await request.get(`/sms/codes/${mobile}`)
    console.log('获取的验证码：', ret)
  }
}
// 退出登录功能
export const logout = (): RootThunkAction => {
  return async(dispatch,getState)=>{
    // 分发action清除Redux中的token，以及本地token
    dispatch({ type:'login/logout'})
    clearToken()
  }
}