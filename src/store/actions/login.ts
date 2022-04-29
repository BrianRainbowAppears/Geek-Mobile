// import { clearToken } from "@/utils/token"

export function logoutAction() {
  return ((dispatch:any) => {
    dispatch({
      type: 'clear/login'
    })
    // clearToken()
    dispatch({
      type: 'clear/user'
    })
  })
}