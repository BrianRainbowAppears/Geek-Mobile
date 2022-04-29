// import { clearToken } from "@/utils/token"
import { FormData } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import request from '@/utils/request'
import { setToken } from '@/utils/token'

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
    const ret = await request.post('/authorizations', payload)
    console.log(ret)
    setToken(ret.data)
    dispatch({ type:'login/token' , payload: ret.data})
  }
}
