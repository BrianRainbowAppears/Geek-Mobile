import { Button, NavBar, Form, Input } from 'antd-mobile'
// React避免样式冲突（同名类名）？使用css module解决
// 1. 给组件新建样式并命名：xxx.module.scss解决
// 2. 给组件导入样式使用：import styles from './xxx/module.scss'
// 3. 在元素上通过差值绑定使用：<div className={styles.类名}>
import styles from './index.module.scss'
import { FormData } from '@/types/data'
import { useDispatch } from 'react-redux'
import { loginAction } from '@/store/actions/login'

const Login = () => {
  const dispatch = useDispatch()
  const login = async (formData: FormData) => {
    console.log(formData)
    await dispatch<any>(loginAction(formData))
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
