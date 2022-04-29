import { Button, NavBar, Form, Input, Toast } from 'antd-mobile'
// React避免样式冲突（同名类名）？使用css module解决
// 1. 给组件新建样式并命名：xxx.module.scss解决
// 2. 给组件导入样式使用：import styles from './xxx/module.scss'
// 3. 在元素上通过差值绑定使用：<div className={styles.类名}>
import styles from './index.module.scss'
import { FormData } from '@/types/data'
import { useDispatch } from 'react-redux'
import { loginAction } from '@/store/actions/login'
import { useHistory } from 'react-router-dom'
import { AxiosError } from 'axios'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const login = async (formData: FormData) => {
    console.log(formData)
    // 登录异常处理 使用try catch 进行捕获
    try {
      await dispatch<any>(loginAction(formData))
      // 登录成功触发轻提示：跳转首页
      Toast.show({
        icon: 'success',
        content: '登陆成功',
        // afterClose方法会在轻提示效果结束后触发
        afterClose: () => {
          history.push('/home')
        }
      })
    } catch (error) {
      // 对于登录操作，出错了通常是请求出问题
      // 因此，此处错误类型可以为 AxiosError 从axios中引入 使用类型断言
      const e = error as AxiosError<{message:string}>
      console.dir(error)
      // 防止e.response为undefined，此处添加?
      console.log(e.response?.data.message);
      Toast.show({
        icon: 'fail',
        content: e.response?.data.message,
      })
    }
  }
  return (
    <div className={styles.root}>
      <NavBar>标题</NavBar>

      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form onFinish={login} validateTrigger={['onBlur']}>
          <Form.Item
            name="mobile"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: '请输入手机号' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号格式错误'
              }
            ]}
            className="login-item"
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="code"
            rules={[{ required: true, message: '请输入验证码' }]}
            validateTrigger="onBlur"
            className="login-item"
            extra={<span className="code-extra">发送验证码</span>}
          >
            <Input placeholder="请输入验证码" autoComplete="off" />
          </Form.Item>

          {/* noStyle 表示不提供 Form.Item 自带的样式 */}
          <Form.Item noStyle>
            <Button block type="submit" color="primary" className="login-submit">
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
